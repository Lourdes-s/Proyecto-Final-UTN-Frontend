import React from 'react'
import './headerInfo.css'
import { Link } from 'react-router-dom'

const ChatHeaderInfo = ({ contact }) => {

    const defaultImage = "https://ia601308.us.archive.org/8/items/whatsapp-smiling-guy-i-accidentally-made//whatsapp%20smiling%20guy%20from%20android_thumb.jpg"

    return (
        <div className='header'>
            <div className='contact-container'>
                <Link to={'/'} className='button'><i className="bi bi-arrow-left-short"></i></Link>
                <div className='name-pic'>
                <Link className='photo-link' to = {'/profile/' + contact.id}><img src={contact.thumbnail ? contact.thumbnail : defaultImage} className="profile-picture" alt="foto de perfil" /></Link>
                <h3 className='name'>{contact.username}</h3>
                </div>
            </div>
            <div className='header-buttons'>
                <button className='button'><i className="bi bi-telephone"></i></button>
                <button className='button'><i className="bi bi-camera-video"></i></button>
                <button className='button'><i className="bi bi-three-dots-vertical"></i></button>
            </div>
        </div>
    )
}

export default ChatHeaderInfo