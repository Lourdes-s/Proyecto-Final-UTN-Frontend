import React, { useEffect, useState } from 'react'
import '../Screens.css'
import { Profile } from '../../Components'

const ProfileScreen = () => {

    const userId = sessionStorage.getItem('user-id')
    const[user, setUser] = useState(undefined)
    const[error, setError] = useState(undefined)

    useEffect(() => {
        const fetchUser = async () => {
            const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`,
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
                case 200:
                    setUser(data)
                    break;
                default:
                    setError("Algo salio mal")
            }
        }
        fetchUser()
    }, [userId])


    if (user) {
        return (
            <div style={{height:'100%'}}>
                <Profile user={user} isOwner={true} urlToReturn={'/'}/>
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

export default ProfileScreen