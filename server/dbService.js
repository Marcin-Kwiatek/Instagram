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
                    `VALUES ('` + user.id + `','` + user.login + `','` + user.password + `' )`
                console.log(queryAddUser)
                connection.query(queryAddUser, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return responseAddUser
        } catch (error) {
            console.error(error)
        }
    }
    async getUserPosts(authorId) {
        try {
            const responseGetPosts = await new Promise((resolve, reject) => {
                const queryGetPosts = `SELECT * FROM posts WHERE postAuthorId = '${authorId}' ORDER BY date DESC` 
                console.log(queryGetPosts)
                connection.query(queryGetPosts, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return responseGetPosts
        } catch (error) {
            console.log(error)
        }
    }
    async getIntro(idUser) {
        try {
            const responseGetIntro = await new Promise((resolve, reject) => {
                const queryGetIntro = "SELECT login FROM users WHERE id = '" + idUser + "'"
                console.log(queryGetIntro)
                connection.query(queryGetIntro, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return responseGetIntro[0].login
        } catch (error) {
            console.log(error)
        }
    }
    async insertPost(post) {
        try {
            const responseAddPost = await new Promise((resolve, reject) => {
                const queryAddPost = "INSERT INTO posts (id, text, postAuthorId, date, imageUrl) " +
                    `VALUES ('` + post.id + `','` + post.text + `','` + post.postAuthorId + `','` + post.date + `','` + post.url +`' )`
                console.log(queryAddPost)
                connection.query(queryAddPost, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return responseAddPost
        } catch (error) {
            console.error(error)
        }
    }
    async insertFollow(observerId, watchedId) {
        try {
            const responseAddFollow = await new Promise((resolve, reject) => {
                const queryAddFollow = "INSERT INTO followers (observerId, watchedId) " +
                    `VALUES ('` + observerId + `','` + watchedId + `' )`
                console.log(queryAddFollow)
                connection.query(queryAddFollow, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return responseAddFollow
        } catch (error) {
            console.error(error)
        }
    }
    async insertLikes(likingPersonId, likedPostId) {
        try {
            const responseAddLikes = await new Promise((resolve, reject) => {
                const queryAddLikes = "INSERT INTO likes (likingPersonId, likedPostId) " +
                    `VALUES ('` + likingPersonId + `','` + likedPostId + `' )`
                console.log(queryAddLikes)
                connection.query(queryAddLikes, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return responseAddLikes
        } catch (error) {
            console.error(error)
        }
    }
    async getUserId(user) {
        try {
            const responseSelectUser = await new Promise((resolve, reject) => {
                const querySelectUser = `SELECT id FROM users WHERE login = '${user.login}' and password = '${user.password}' `
                console.log(querySelectUser)
                connection.query(querySelectUser, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            if (responseSelectUser.length === 0) {
                return null
            } else {
                return responseSelectUser[0].id
            }
        } catch (error) {
            console.error(error)
        }
    }
    async unfollow(observerId, watchedId) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `DELETE FROM followers WHERE observerId = '${observerId}' and watchedId = '${watchedId}'`
                console.log(query)
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async unlike(likingPersonId, likedPostId) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `DELETE FROM likes WHERE likingPersonId = '${likingPersonId}' and likedPostId = '${likedPostId}'`
                console.log(query)
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async selectSignUp(user) {
        try {
            const responseSelectSignUp = await new Promise((resolve, reject) => {
                const querySelectSignUp = `SELECT id FROM users WHERE login = '${user.login}'`
                console.log(querySelectSignUp)
                connection.query(querySelectSignUp, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            if (responseSelectSignUp.length === 0) { return null } else return responseSelectUser[0].id
        } catch (error) {
            console.error(error)
        }
    }
    async searchUser(user) {
        try {
            const responseSearchUser = await new Promise((resolve, reject) => {
                const querySearchUser = `SELECT login, id FROM users WHERE login LIKE '${user.login}%' LIMIT 5`
                console.log(querySearchUser)
                connection.query(querySearchUser, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            if (responseSearchUser.length === 0) { return null } else return responseSearchUser
        } catch (error) {
            console.error(error)
        }
    }
    async getObservedUsers(userId) {
        try {
            const observedUsers = await new Promise((resolve, reject) => {
                const queryObservedUsers = `SELECT watchedId FROM followers WHERE observerId = '${userId}'`
                console.log(queryObservedUsers)
                connection.query(queryObservedUsers, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return observedUsers.map(databaseRow => databaseRow.watchedId)
        } catch (error) {
            console.error(error)
        }
    }
    async getUsersPosts(observedUsers, offset, limit) {
        try {
            const usersPosts = await new Promise((resolve, reject) => {
                let observedUsersWithQuotes = observedUsers.map(observedUser => `'${observedUser}'`)
                const queryUsersPosts = `SELECT text, posts.id, postAuthorId, login, imageUrl FROM posts 
                INNER JOIN users ON posts.postAuthorId=users.id  
                WHERE postAuthorId IN (${observedUsersWithQuotes}) 
                ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}`
                console.log(queryUsersPosts)
                connection.query(queryUsersPosts, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return usersPosts
        } catch (error) {
            console.error(error)
        }
    }
    async getIsFollowing(observedId, watchedId) {
        try {
            const responseSearchFollow = await new Promise((resolve, reject) => {
                const querySearchFollow = `SELECT * FROM followers WHERE observerId = '${observedId}' AND  watchedId = '${watchedId}'`
                console.log(querySearchFollow)
                connection.query(querySearchFollow, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            if (responseSearchFollow.length === 0) { return null } else return responseSearchFollow
        } catch (error) {
            console.error(error)
        }
    }
    async getIsLiking(likingPersonId, likedPostId) {
        try {
            const responseSearchLike = await new Promise((resolve, reject) => {
                const querySearchLike = `SELECT * FROM likes WHERE likingPersonId = '${likingPersonId}' AND  likedPostId = '${likedPostId}'`
                console.log(querySearchLike)
                connection.query(querySearchLike, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            if (responseSearchLike.length === 0) { return null } else return responseSearchLike
        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = DbService