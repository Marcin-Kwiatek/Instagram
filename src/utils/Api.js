import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';


export const signIn = (login, password) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: login, password: password })
    })
}
export const getPersonIntro = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/personIntro?id=${userId}`, {})
}
export const getUserPost = (currentUserId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${currentUserId}/posts`, {})
}
export const addingPost = (addPostText, currentUserId, url) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: generateId(), text: addPostText, postAuthorId: currentUserId,
            date: currentDate(), url: url
        })
    })
}
export const addingImage = (data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/image`, {
        method: 'POST',
        body: data
    })
}
export const getPostComments = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}?id=${id}&limit=100`, {})
}
export const addingComment = (postId, newComment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ postId: postId, commentContent: newComment, id: generateId(), date: currentDate() })
    })
}
export const deleteLike = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/likes?id=${postId}`, {
        method: 'DELETE',
        headers: {
            'authorization': localStorage.getItem("accessToken")
        },
    })
}
export const addLike = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ likedPostId: postId })
    })
}
export const isPostLiking = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/likes?likedPostId=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("accessToken")
        },
    })
}
export const getNumberLikesAndComment = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/likesNumber?likedPostId=${id}`, {})
}
export const getThreePostComments = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/comments?id=${id}&limit=3`, {})
}
export const addToFollowed = (focusUserId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ watchedId: focusUserId })
    })
}
export const deleteFromFollowers = (focusUserId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/follow?id=${focusUserId}`, {
        method: 'DELETE',
        headers: {
            'authorization': localStorage.getItem("accessToken")
        },
    })
}
export const isUserFollowing = (userId, focusUserId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/follow?observedId=${userId}&watchedId=${focusUserId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
export const addSearchUser = (value) => {
    return fetch(`${process.env.REACT_APP_API_URL}/searchUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: value })
    })
}
export const signUp = (login, password) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: generateId(), login: login, password: password })
    })
}
export const getMorePosts = (offset) => {
    return fetch(`${process.env.REACT_APP_API_URL}/currentUser/observedUsers/posts?offset=${offset}&limit=10`, {
        headers: {
            'authorization': localStorage.getItem("accessToken")
        },
    })
}
