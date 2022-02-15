import React, { useState, useEffect } from 'react';
import './AddPost.css';
import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';
import { ImImages } from "react-icons/im";
import ClickAwayListener from 'react-click-away-listener';



function AddPost(props) {
    const [addPostText, setAddPostText] = useState('');
    const [err, setErr] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };
    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")
        setCurrentUserId(currentUserId)
    }, [])
    const changeAddPostText = (e) => {
        setAddPostText(e.target.value)
    }
    const cancelAddPost = () => {
        setErr('')
        props.cancelAddPost()
    }
    const addPost = () => {
        console.log(addPostText)
        if (addPostText === "") {
            setErr('Pole nie może być puste!')
        }
        else {
            addImage().then((url) => {
                fetch(`http://localhost:5000/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: generateId(), text: addPostText, postAuthorId: currentUserId,
                        date: currentDate(), url: url
                    })
                }).then(() => { props.onPostAdded() })
                    .catch((err) => { console.error(err) })
            })
        }
    }
    const addImage = () => {
        var data = new FormData()
        data.append('file', selectedFile)
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

    return (
        <>
            <div className='obscure-background'></div>
            <ClickAwayListener onClickAway={cancelAddPost}>
                <div className='add-post-container'>
                    <div className='add-post-header'>
                        <button className='add-post-header-text' style={{ float: 'left' }} onClick={cancelAddPost}>Cancel</button>
                        <button className='add-post-header-text' style={{ float: 'right' }} onClick={addPost}>Add Post</button>
                    </div>
                    <div className='add-post-image-container'>
                        <ImImages className='add-post-image-icon'></ImImages>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={onFileChange}
                            style={{ color: 'red' }}>
                        </input>
                        <div className='add-text' >
                            <input onChange={changeAddPostText} type='text' placeholder='enter your post content'></input>
                        </div>
                        <div className="err">{err}</div>
                    </div>
                </div>
            </ClickAwayListener>
        </>
    )
}

export default AddPost;
