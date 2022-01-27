import React, { Component } from 'react';
import './AddPost.css';
import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';


class AddPost extends Component {
    state = {
        addPostText: '',
        err: '',
        currentUserId: '',
        selectedFile: null
    }
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    componentDidMount() {
        const currentUserId = localStorage.getItem("currentUserId")
        this.setState({ currentUserId: currentUserId })
    }
    changeAddPostText = (e) => {
        this.setState({ addPostText: e.target.value })
    }
    cancelAddPost = () => {
        this.setState({ err: '' })
        this.props.cancelAddPost()
    }
    addPost = () => {
        if (this.state.addPostText === "") {
            this.setState({ err: 'Pole nie może być puste' })
            console.log(this.state.addPostText)
        }
        else {
            this.addImage().then((url) => {
                fetch(`http://localhost:5000/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: generateId(), text: this.state.addPostText, postAuthorId: this.state.currentUserId,
                        date: currentDate(), url: url
                    })
                }).then(() => { this.props.onPostAdded() })
                    .catch((err) => { console.error(err) })
            })
        }   
    }
    addImage = () => {
        var data = new FormData()
        data.append('file', this.state.selectedFile)
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:5000/image`, {
                method: 'POST',
                body: data
            }).then((response) => {
                return response.json()
            }).then((data) => {
                resolve(data.url)
            })
                .catch((err) => { console.error(err) })
        })
    }

    render() {

        return (
            <div className='addPostContainer'>
                <div className='addText' ><input onChange={this.changeAddPostText} type='text' placeholder='enter your post content'></input></div>
                <input type="file" accept="image/png, image/gif, image/jpeg" onChange={this.onFileChange}></input>
                <button onClick={this.cancelAddPost}>Cancel</button>
                <button onClick={this.addPost}>Add Post</button>
                <div className="err">{this.state.err}</div>
            </div>

        )
    }
}

export default AddPost;
