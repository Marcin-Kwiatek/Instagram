const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const dbService = require('./dbService')

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
    if (result === null) { response.sendStatus(404) } else response.sendStatus(200)
    console.log(result)
})
app.listen(process.env.PORT, function() { console.log('app is running') })