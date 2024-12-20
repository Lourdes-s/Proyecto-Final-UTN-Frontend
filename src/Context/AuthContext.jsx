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
    const login = (auth_token) => {
        sessionStorage.setItem('access-token', auth_token)
        setIsAuthenticated(true)
        navigate('/home')
    } 

    const logout = () => {
        sessionStorage.removeItem('access-token')
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