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
    catch(err) {
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
app.post('/addPost', function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = db.insertPost(request.body)
    response.sendStatus(200)
})
app.post('/addFollow', function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = db.insertFollow(request.body)
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

app.delete('/unfollow', function (request, response) {
    console.log(request.query.id)
    let idObserver = request.query.id.substring(0, 30)
    let idWatched = request.query.id.substring(30, 60)
    const db = dbService.getDbServiceInstance()
    const result = db.unfollow(idObserver, idWatched)
    result
        .then(data => {
            response.json({ data: data })
        })
        .catch(err => console.log(err))
})
app.post('/searchFollow', async function (request, response) {
    const db = dbService.getDbServiceInstance()
    const result = await db.searchFollow(request.body)
    console.log('Search Follow result', result)
    if (result === null) {
        response.sendStatus(404)
    } else {
        response.sendStatus(200)
    }
})
app.get('/currentUser/posts', authenticateJwt, function (request, response) {
    console.log(request.currentUserId)
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