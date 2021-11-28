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
app.listen(process.env.PORT, function() { console.log('app is running') })