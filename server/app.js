const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const dbService = require('./dbService')
const jwt = require('jsonwebtoken')

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/user', function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = db.insertUser(request.body)
    response.sendStatus(200)
})
app.get('/user/:userId/posts', async function (request, response) {
    try {
        console.log(request.params.userId)
        let authorId = request.params.userId
        const db = dbService.getDbServiceInstance()
        const posts = await db.getUserPosts(authorId)
        response.json({ data: posts })
    }
    catch (err) {
        console.error(err)
        response.sendStatus(500)
    }
})
app.get('/personIntro', function (request, response) {
    console.log(request.query.id)
    let idUser = request.query.id
    const db = dbService.getDbServiceInstance()
    const result = db.getIntro(idUser)
    result
        .then(data => {
            response.json({ data: data })
        })
        .catch(err => console.log(err))
})
app.get('/currentUser/observedUsers/posts', authenticateJwt, async function (request, response) {
    try {
        let offset = request.query.offset
        let limit = request.query.limit
        let currentUserId = request.currentUserId
        const db = dbService.getDbServiceInstance()
        const observedUsers = await db.getObservedUsers(currentUserId)
        console.log('observedUsers = ', observedUsers)
        const usersPosts = await db.getUsersPosts(observedUsers,offset, limit)
        console.log(usersPosts)
        response.json({posts: usersPosts })
    }
    catch (error){
        console.error(error)
        response.sendStatus(500)
    }

})
app.post('/post', function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = db.insertPost(request.body)
    response.sendStatus(200)
})
app.post('/follow', authenticateJwt, function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = db.insertFollow(request.currentUserId, request.body.watchedId)
    response.sendStatus(200)
})
app.post('/signIn', async function (request, response) {
    const db = dbService.getDbServiceInstance()
    const id = await db.getUserId(request.body)
    if (id === null) {
        response.sendStatus(404)
    } else {
        let accessToken = jwt.sign({ currentUserId: id }, process.env.ACCESS_TOKEN_SECRET)
        response.status(200).json({ accessToken, userId: id })
    }
    console.log(id)
})
app.post('/signUp', async function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = await db.selectSignUp(request.body)
    if (result === null) {
        response.sendStatus(200)
    } else {
        response.sendStatus(404)
    }
    console.log(result)
})
app.post('/searchUser', async function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = await db.searchUser(request.body)
    if (result === null) {
        response.sendStatus(404)
    } else {
        response.status(200).json({ users: result })
    }
    console.log(result)
})

app.delete('/follow', authenticateJwt, function (request, response) {
    console.log(request.query.id)
    let watchedId = request.query.id
    const db = dbService.getDbServiceInstance()
    const result = db.unfollow(request.currentUserId, watchedId)
    result
        .then(data => {
            response.json({ data: data })
        })
        .catch(err => console.log(err))
})
app.get('/follow', async function (request, response) {
    let observerId = request.query.observerId
    let watchedId = request.query.watchedId
    const db = dbService.getDbServiceInstance()
    const result = await db.getIsFollowing(observerId, watchedId)
    console.log('Search Follow result', result)
    if (result === null) {
        response.sendStatus(404)
    } else {
        response.sendStatus(200)
    }
})

function authenticateJwt(request, response, next) {
    if (!request.headers.authorization) {
        response.sendStatus(401)
        return
    }
    jwt.verify(request.headers.authorization, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err) {
            response.sendStatus(403)
            return
        }
        request.currentUserId = result.currentUserId
        next()
    })
}
app.listen(process.env.PORT, function () { console.log('app is running') })