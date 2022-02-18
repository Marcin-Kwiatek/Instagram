import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsPlusSquare } from "react-icons/bs";
import generateId from '../utils/generateId';
import currentDate from '../utils/currentDate';
import { ImImages } from "react-icons/im";
import Modal from 'react-modal'; import SearchUser from './SearchUser';
import ClickAwayListener from 'react-click-away-listener';
import { useHistory } from "react-router-dom";

Modal.setAppElement('#root');
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '50%',
        height: '60%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        margin: '0px',
        borderRadius: '5%',
        overflow: 'hidden'
    },
};

function Navbar() {
    const [visibiltyShowMyProfileEvents, setVisibiltyShowMyProfileEvents] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [addPostText, setAddPostText] = useState('');
    const [err, setErr] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const history = useHistory()

    const showMyProfileEvents = () => {
        setVisibiltyShowMyProfileEvents(true)
    }
    const hideMyProfileEvents = () => {
        setVisibiltyShowMyProfileEvents(false)
    }
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setErr('')
        setIsOpen(false)
    }
    const LogOut = () => {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('accessToken');
        history.push("/SignIn");
    }
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

    const addPost = () => {
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
                }).then(() => { closeModal() })
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
            <div className="logo">
                <div className="logoContainer">
                    <div className="imgLogo">
                        <Link to='/'><img src={require("../img/logo.png").default}></img></Link>
                    </div>
                    <SearchUser></SearchUser>
                    <div className="icons">
                        <Link className='iconLink' to='/'><div className="oneIcon"><AiFillHome></AiFillHome></div></Link>
                        <div className='oneIcon' onClick={openModal}><BsPlusSquare ></BsPlusSquare></div>
                        <div className="oneIcon" onClick={showMyProfileEvents} style={{ position: 'relative' }}>
                            <BsFillPersonFill></BsFillPersonFill>
                            {visibiltyShowMyProfileEvents &&
                                <ClickAwayListener onClickAway={hideMyProfileEvents}>
                                    <div className='my-events'>
                                        <Link className='iconLink' to='/myProfile'>
                                            <div className='my-event'>
                                                <BsFillPersonFill></BsFillPersonFill>Profile
                                            </div>
                                        </Link>
                                        <div className='my-event' id='my-event-log-out' onClick={LogOut}>
                                            Log Out
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <div className='add-post-container'>
                    <div className='add-post-header'>
                        <button className='add-post-header-text' style={{ float: 'left' }} onClick={closeModal}>Cancel</button>
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
            </Modal>
        </>
    )
}

export default Navbar;
