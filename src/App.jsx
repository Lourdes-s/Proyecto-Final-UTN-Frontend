import React from "react"
import { Route, Routes } from "react-router-dom"
import { ChatsScreen, ForgotPasswordScreen, HomeScreen, LoginScreen, RecoveryPasswordScreen, RegisterScreen, ValidateMailScreen, ChatScreen } from "./Screens"
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
                <Route path="/home" element={<HomeScreen/>}/>                
                <Route element={<ProtectedRoute/>}>
                    <Route path="/chats" element={<ChatsScreen/>}/> 
                    <Route path="/chat/:contactId" element={<ChatScreen/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
