export const signIn = (login, password) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: login, password: password })
    })
}
