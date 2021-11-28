const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
let instance = null

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
})

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log('db ' + connection.state)
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }
    async insertUser(user) {
        try {
            const responseAddUser = await new Promise((resolve, reject) => {
                const queryAddUser = "INSERT INTO users (id, login, password) " +
                    `VALUES ('` + user.id + `','` + user.login + `','` + user.password + ` )`
                console.log(queryAddUser)
                connection.query(queryAddUser, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)

                })
            })
            return responseAddUser
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = DbService