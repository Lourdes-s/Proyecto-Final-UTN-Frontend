import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ChatHeaderInfo, ListaMensajes, MensajeForm } from '../../Components'
import '../Screens.css'

const ChatScreen = () => {
    const {contactId} = useParams()
    const[contact, setContact] = useState(undefined)
    const[error, setError] = useState(undefined)

    useEffect(() => {
        const fetchContact = async () => {
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${contactId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
                    }
                }
            )
            const data = await responseHTTP.json()
            switch (responseHTTP.status) {
                case 404:
                    setError("No se encontro contacto")
                    break;
                case 200:
                    setContact({...data, "id": contactId})
                    break;
                default:
                    setError("Algo salio mal")
            }
        }
        fetchContact()
    }, [contactId])

    const[newMessageInfo, setNewMessageInfo] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const getPage = useCallback(async () => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/chat/${contactId}?page=${page}&per_page=${10}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
                }
            }
        )
        const data = await responseHTTP.json()
        console.log(data)
        if (data.length === 0) {
            setHasMore(false)
            } else {
            setNewMessageInfo((newMessageInfo) => [...newMessageInfo, ...data])
            setPage((prevPage) => prevPage + 1)
        }
    }, [page])

    const handleSubmitNewMessage = async (e) => {
        e.preventDefault()
        const newMessage = {
            is_issurer: true,
            content: e.target.mensaje.value,
            created_at: "2024-12-18T02:11:29.000Z"
        }

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/chat/${contactId}/message`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
                },
                body: JSON.stringify({content: newMessage.content})
            }
        )
        if (responseHTTP.ok) {
            setNewMessageInfo([newMessage, ...newMessageInfo])
        }
    }
    if (contact) {
        return (
            <div style={{height:'100%'}}>
                <ChatHeaderInfo contact={contact}/>
                <ListaMensajes mensajesChat={newMessageInfo} hasMore={hasMore} getPage={getPage}/>
                <MensajeForm handleSubmitNewMessage={handleSubmitNewMessage}/>
            </div>
        )
    }
    if (error) {
        return (
            <div style={{height:'100%'}}>
                <h1>{error}</h1>
            </div>
        )
    }
    return (
        <div style={{height:'100%'}}>
            <div className="wrapper">
                <div className="loader">
                    <div className="loading one"></div>
                    <div className="loading two"></div>
                    <div className="loading three"></div>
                    <div className="loading four"></div>
                </div>
            </div>
        </div>
    )
}

export default ChatScreen