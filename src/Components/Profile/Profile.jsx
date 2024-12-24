import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LiaPhoneSolid } from "react-icons/lia";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import './Profile.css'

const Profile = ({user, isOwner, urlToReturn}) => {

    const navigate = useNavigate()

    const defaultImage = "https://ia601308.us.archive.org/8/items/whatsapp-smiling-guy-i-accidentally-made//whatsapp%20smiling%20guy%20from%20android_thumb.jpg"
    const defaultData = "Sin informar"

    return (
        <div className='info-profile-container'>
            <div className='info-profile-volver'>
                <Link to={urlToReturn}><i className="bi bi-arrow-left-short"></i></Link>
            </div>
            <div className='info-contact-main'>
                <img className='profile-pic-info' src={user.thumbnail ? user.thumbnail : defaultImage} alt="Foto de perfil" />
                <h2 className='profile-info-name'>{user.username}</h2>
                <span className='profile-info-phone'>{user.telephone ? user.telephone : defaultData}</span>
                <span className='profile-info-1'>{user.public_state ? user.public_state : defaultData}</span>
            </div>
            {!isOwner && <div className='info-profile-call'>
                <span className='info-profile-call-icon'><LiaPhoneSolid /></span>
                <span className='info-profile-call-text'>Llamar</span>
            </div>}
            <div className='info-contact-secondary'>
                <span className='info-contact-description'><HiOutlineChatBubbleBottomCenterText /> {user.description_content ? user.description_content : defaultData}</span>
                <span className='info-contact-email'><HiOutlineMail /> {user.email}</span>
                <span className='info-contact-address'><HiOutlineLocationMarker /> {user.address_content ? user.address_content : defaultData}</span>
            </div>
            {
                isOwner && 
                <button onClick={() => navigate("/profile/modify")} className='info-profile-modify'>
                    <span className='info-profile-call-text'>Modificar</span>
                </button >
            }
        </div> 
    )
}

export default Profile