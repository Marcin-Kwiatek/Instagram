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

app.post('/user', function(request, response) {
    const db = dbService.getDbServiceInstance()
    const result = db.insertUser(request.body)
    response.sendStatus(200)
})
app.post('/addPost', function(request, response) {
    const db = dbService.getDbServiceInstance()
    const result = db.insertPost(request.body)
    response.sendStatus(200)
})
app.post('/signIn', async function(request, response) {
    const db = dbService.getDbServiceInstance()
    const result = await db.selectUser(request.body)
    if (result === null) {
        response.sendStatus(404)
    } else {
        let accessToken = jwt.sign({ currentUserId: result }, process.env.ACCESS_TOKEN_SECRET)
        response.status(200).json({ accessToken })
    }
    console.log(result)
})
app.post('/signUp', async function(request, response) {
    const db = dbService.getDbServiceInstance()
    const result = await db.selectSignUp(request.body)
    if (result === null) {
        response.sendStatus(200)
    } else {
        response.sendStatus(404)
    }
    console.log(result)
})
app.post('/searchUser', async function(request, response) {
    const db = dbService.getDbServiceInstance()
    const result = await db.searchUser(request.body)
    if (result === null) {
        response.sendStatus(404)
    } else {
        response.status(200).json({ users: result })
    }
    console.log(result)
})
app.get('/currentUser/posts', authenticateJwt, function(request, response) {
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
app.listen(process.env.PORT, function() { console.log('app is running') })