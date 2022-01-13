import React, { Component } from 'react';
import './PersonIntro.css';


class MyIntro extends Component {
    state = {
        nickName: []
    }

    async componentDidMount() {
        const userId = localStorage.getItem("currentUserId")
        fetch(`http://localhost:5000/personIntro?id=${userId}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                let nick = data.data
                this.setState({ nickName: nick })
            })
            .catch((error) => console.error(error))
    }
    render() {
        return (
            <div className='introContainer'>
                {this.state.nickName}
            </div>
        )
    }

}

export default MyIntro;