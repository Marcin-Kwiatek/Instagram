import React, { Component } from 'react';
import './AddPost.css';
import generateId from '../utils/generateId';


class AddPost extends Component {
    state = {
        addPostText: '',
        err: '',
        currentUserId: ''
    }
    componentDidMount(){
        const currentUserId = localStorage.getItem("currentUserId")
        this.setState({currentUserId:currentUserId})
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
        }
        else {
            fetch(`http://localhost:5000/addPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: generateId(), text: this.state.addPostText, postAuthorId: this.state.currentUserId })
            }).then(() => {this.props.onPostAdded()})
            .catch((err) => {console.error(err)})
        }
    }

    render() {

        return (
            <div className='addPostContainer'>
                <div className='addText' ><input onChange={this.changeAddPostText} type='text' placeholder='enter your post content'></input></div>
                <button onClick={this.cancelAddPost}>Cancel</button>
                <button onClick={this.addPost}>Add Post</button>
                <div className="err">{this.state.err}</div>
            </div>

        )
    }
}

export default AddPost;
