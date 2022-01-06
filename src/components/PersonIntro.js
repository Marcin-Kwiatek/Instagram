import React, { Component } from 'react';
import './PersonIntro.css';


class PersonIntro extends Component {
    state = {
        nickName: []
    }
    componentDidMount() {
        const userId = localStorage.getItem("focusUserId")
        fetch(`http://localhost:5000/personIntro?id=${userId}`, {})
            .then(function (response) { return response.json() })
            .then((data) => {
                console.log(data.data)
                let nick = data.data
                this.setState({ nickName: nick })
            })
    }
    render() {
        return (
            <div className='introContainer'>
                {this.state.nickName}
            </div>
        )
    }

}

export default PersonIntro;