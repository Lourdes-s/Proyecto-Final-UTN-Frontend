import { createContext, useEffect, useState } from "react" 
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [is_authenticated_state, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('access-token')))
    useEffect(
        () => {
            Boolean(sessionStorage.getItem('access-token')) && setIsAuthenticated(true)
        }, []
    )
    const login = (auth_token, user_id) => {
        sessionStorage.setItem('access-token', auth_token)
        sessionStorage.setItem('user-id', user_id)
        setIsAuthenticated(true)
        navigate('/')
    } 

    const logout = () => {
        sessionStorage.removeItem('access-token')
        sessionStorage.removeItem('user-id')
        setIsAuthenticated(false)
        navigate('/login')
    }

    return (
        <AuthContext.Provider
            value={
                {
                    is_authenticated_state,
                    login,
                    logout
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}