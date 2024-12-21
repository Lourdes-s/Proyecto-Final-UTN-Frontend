import React, { useEffect, useState } from 'react'
import '../Screens.css'
import { useParams } from 'react-router-dom'
import { Profile } from '../../Components'

const ContactScreen = () => {

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
                    setContact(data)
                    break;
                default:
                    setError("Algo salio mal")
            }
        }
        fetchContact()
    }, [contactId])


    if (contact) {
        return (
            <div style={{height:'100%'}}>
                <Profile user={contact} isOwner={false} urlToReturn={'/chat/' + contactId}/>
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

export default ContactScreen