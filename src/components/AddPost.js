import React, { Component } from 'react';
import './AddPost.css';
import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';
import { ImImages } from "react-icons/im";
import ClickAwayListener from 'react-click-away-listener';



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
            this.setState({ err: 'Pole nie może być puste!' })
        }
        else if (this.state.addPostText !== "") {
            this.setState({ err: '' })
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
            <>
                <div className='obscure-background'></div>
                <ClickAwayListener onClickAway={this.cancelAddPost}>
                    <div className='add-post-container'>
                        <div className='add-post-header'>
                            <button className='add-post-header-text' style={{float:'left'}} onClick={this.cancelAddPost}>Cancel</button>
                            <button className='add-post-header-text' style={{float:'right'}} onClick={this.addPost}>Add Post</button>
                        </div>
                        <div className='add-post-image-container'>
                            <ImImages className='add-post-image-icon'></ImImages>
                            <input 
                                type="file" 
                                accept="image/png, image/gif, image/jpeg" 
                                onChange={this.onFileChange} 
                                style={{color:'red'}}>
                            </input>
                            <div className='add-text' ><input onChange={this.changeAddPostText} type='text' placeholder='enter your post content'></input></div>
                            <div className="err">{this.state.err}</div>
                        </div>
                    </div>
                </ClickAwayListener>
            </>
        )
    }
}

export default AddPost;
