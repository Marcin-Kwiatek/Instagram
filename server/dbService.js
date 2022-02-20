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
    charset: 'utf8mb4'
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
    async createUser(user) {
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
    }
    async getUserPosts(authorId) {
        const responseGetPosts = await new Promise((resolve, reject) => {
            const queryGetPosts = `SELECT * FROM posts WHERE postAuthorId = '${authorId}' ORDER BY date DESC`
            console.log(queryGetPosts)
            connection.query(queryGetPosts, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return responseGetPosts
    }
    async getIntro(idUser) {
        const responseGetIntro = await new Promise((resolve, reject) => {
            const queryGetIntro = "SELECT login FROM users WHERE id = '" + idUser + "'"
            console.log(queryGetIntro)
            connection.query(queryGetIntro, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return responseGetIntro[0].login
    }
    async getLikesNumber(postId) {
        const response = await new Promise((resolve, reject) => {

            const query = `SELECT COUNT(DISTINCT likes.likingPersonId) AS likesNr FROM likes WHERE likedPostId = '${postId}'`
            console.log(query)
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return response
    }
    async getCommentsNumber(postId) {
        const response = await new Promise((resolve, reject) => {
            const query = `SELECT COUNT(DISTINCT comments.id) AS commentsNr FROM comments WHERE postId = '${postId}'`
            console.log(query)
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return response
    }
    async insertPost(post) {
        const responseAddPost = await new Promise((resolve, reject) => {
            const queryAddPost = "INSERT INTO posts (id, text, postAuthorId, date, imageUrl) " +
                `VALUES ('` + post.id + `','` + post.text + `','` + post.postAuthorId + `','` + post.date + `','` + post.url + `' )`
            console.log(queryAddPost)
            connection.query(queryAddPost, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return responseAddPost
    }
    async insertFollow(observerId, watchedId) {
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
    }
    async insertLikes(likingPersonId, likedPostId) {
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
    }
    async insertComment(commentatorId, postId, commentContent, id, date) {

        const responseAddComment = await new Promise((resolve, reject) => {
            const queryAddComment = "INSERT INTO comments (commentatorId, postId, commentContent, id, date) " +
                `VALUES ('` + commentatorId + `','` + postId + `','` + commentContent + `','` + id + `','` + date + `' )`
            console.log(queryAddComment)
            connection.query(queryAddComment, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return responseAddComment
    }
    async getUserId(user) {
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
    }
    async unfollow(observerId, watchedId) {
        const response = await new Promise((resolve, reject) => {
            const query = `DELETE FROM followers WHERE observerId = '${observerId}' and watchedId = '${watchedId}'`
            console.log(query)
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return response
    }
    async unlike(likingPersonId, likedPostId) {
        const response = await new Promise((resolve, reject) => {
            const query = `DELETE FROM likes WHERE likingPersonId = '${likingPersonId}' and likedPostId = '${likedPostId}'`
            console.log(query)
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return response
    }
    async getUserIdByLogin(login) {
        const response = await new Promise((resolve, reject) => {
            const query = `SELECT id FROM users WHERE login = '${login}'`
            console.log(query)
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        if (response.length === 0) {
            return null
        } else {
            return response[0]
        }
    }
    async searchUser(user) {
        const responseSearchUser = await new Promise((resolve, reject) => {
            const querySearchUser = `SELECT login, id FROM users WHERE login LIKE '${user.login}%' LIMIT 5`
            console.log(querySearchUser)
            connection.query(querySearchUser, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        if (responseSearchUser.length === 0) { return null } else return responseSearchUser
    }
    async getObservedUsers(userId) {
        const observedUsers = await new Promise((resolve, reject) => {
            const queryObservedUsers = `SELECT watchedId FROM followers WHERE observerId = '${userId}'`
            console.log(queryObservedUsers)
            connection.query(queryObservedUsers, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return observedUsers.map(databaseRow => databaseRow.watchedId)
    }
    async getComments(postId, limit) {
        const responseComments = await new Promise((resolve, reject) => {
            const queryComments = `SELECT comments.commentatorId, comments.commentContent, comments.id, users.login FROM comments 
                INNER JOIN users ON comments.commentatorId=users.id 
                WHERE postId = '${postId}'
                ORDER BY comments.date DESC
                LIMIT ${limit}`
            console.log(queryComments)
            connection.query(queryComments, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        if (responseComments.length === 0) { return null } else return responseComments
    }
    async getUsersPosts(observedUsersId, offset, limit) {
        const usersPosts = await new Promise((resolve, reject) => {
            let observedUsersWithQuotes = observedUsersId.map(observedUserId => `'${observedUserId}'`)
            const queryUsersPosts = `SELECT text, posts.id, postAuthorId, login, imageUrl, 
                COUNT(DISTINCT likes.likingPersonId) AS likesNr, 
                COUNT(DISTINCT comments.id) AS commentsNr
                FROM posts 
                INNER JOIN users ON posts.postAuthorId=users.id  
                INNER JOIN likes ON posts.id=likes.likedPostId
                INNER JOIN comments ON posts.id=comments.postId
                WHERE postAuthorId IN (${observedUsersWithQuotes}) 
                GROUP By posts.id
                ORDER BY posts.date DESC LIMIT ${limit} OFFSET ${offset}`
            console.log(queryUsersPosts)
            connection.query(queryUsersPosts, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        return usersPosts
    }
    async getIsFollowing(observedId, watchedId) {
        const responseSearchFollow = await new Promise((resolve, reject) => {
            const querySearchFollow = `SELECT * FROM followers WHERE observerId = '${observedId}' AND  watchedId = '${watchedId}'`
            console.log(querySearchFollow)
            connection.query(querySearchFollow, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        if (responseSearchFollow.length === 0) { return null } else return responseSearchFollow
    }
    async getIsLiking(likingPersonId, likedPostId) {
        const responseSearchLike = await new Promise((resolve, reject) => {
            const querySearchLike = `SELECT * FROM likes WHERE likingPersonId = '${likingPersonId}' AND  likedPostId = '${likedPostId}'`
            console.log(querySearchLike)
            connection.query(querySearchLike, (err, results) => {
                if (err) reject(new Error(err.message))
                resolve(results)
            })
        })
        if (responseSearchLike.length === 0) { return null } else return responseSearchLike
    }

}

module.exports = DbService