import React from 'react'
import './Mensaje.css'

const Mensaje = ({ mensajeInfo }) => {
    const { is_issurer, content, created_at } = mensajeInfo
    return (
        <div className= {`container-chat ${is_issurer && "right1"} `}>
            <div className={`chats ${is_issurer && "right2"}`}>
                    <span className='author'>{is_issurer ? 'Yo' : 'Amigo'}</span>
                    <p className='text'>{content}</p>
                <div className='info'>
                    <span className='time-since'>{created_at}</span>
                    <div className='status-container'>
                    <span ><i className="bi bi-check2"></i></span>
                    </div>
                </div>
            </div> 
        </div> 
    )
}

export default Mensaje