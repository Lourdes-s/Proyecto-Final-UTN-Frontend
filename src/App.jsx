import React from "react"
import { Route, Routes } from "react-router-dom"
import { ChatsScreen, ForgotPasswordScreen, LoginScreen, RecoveryPasswordScreen, RegisterScreen, ValidateMailScreen, ChatScreen } from "./Screens"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx"
const App = () => {
    return (
        <div className='phone'>
            <Routes>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path="/verify-email/:validation_token" element={<ValidateMailScreen/>}/>
                <Route path="/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<ChatsScreen/>}/> 
                    <Route path="/chat/:contactId" element={<ChatScreen/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
