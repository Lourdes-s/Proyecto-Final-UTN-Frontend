import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.jsx'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { is_authenticated_state } = useContext(AuthContext)
    return (
        is_authenticated_state 
        ? <Outlet/> 
        : <Navigate to={"/login"}/>
    )
}

export default ProtectedRoute