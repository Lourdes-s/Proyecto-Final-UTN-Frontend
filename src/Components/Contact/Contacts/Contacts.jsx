import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import './Contacts.css'
import useInfiniteScrolling from '../../../Hooks/useInfiniteScrolling'

const Contacts = () => {
    const defaultImage = "https://ia601308.us.archive.org/8/items/whatsapp-smiling-guy-i-accidentally-made//whatsapp%20smiling%20guy%20from%20android_thumb.jpg"

    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const getPage = useCallback(async () => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/chat?page=${page}&per_page=${10}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
                }
            }
        )
        const data = await responseHTTP.json()
        if (data.length === 0) {
            setHasMore(false)
        } 
        else {
            setProducts((prevProducts) => [...prevProducts, ...data])
            setPage((prevPage) => prevPage + 1)
        }
    }, [page])


    const { loadMoreRef } = useInfiniteScrolling(getPage, hasMore)

    return (
        <div className='contacts-container'>
            {
                products.map(contact =>{

                    const date = new Date(contact.created_at);
                    // Extraer la hora y los minutos
                    const hours = date.getHours().toString().padStart(2, '0') // Asegura que tenga 2 dígitos
                    const minutes = date.getMinutes().toString().padStart(2, '0') // Asegura que tenga 2 dígitos
                    // Formatear la hora
                    const formattedTime = `${hours}:${minutes}`

                    return(
                        <Link className='contact-list' to = {'/chat/' + contact.id} key={contact.id}>
                            <img className='profile-pic-contacts' src= {contact.thumbnail ? contact.thumbnail : defaultImage} alt='foto de perfil' /> 
                            <div className='text-contacts'>
                                <span className='contact-name'>{contact.username}</span>
                                <p className='contact-mensaje-text'> {contact.content}</p>
                                <span className='contact-time'>{formattedTime}</span>
                            </div>
                        </Link>
                    )
                })
                
            }
            {
            hasMore //cargando
                && <div ref={loadMoreRef} className="wrapper">
                    <div className="loader">
                        <div className="loading one"></div>
                        <div className="loading two"></div>
                        <div className="loading three"></div>
                        <div className="loading four"></div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Contacts