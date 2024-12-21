import React from "react"
import { Route, Routes } from "react-router-dom"
import { ChatsScreen, ForgotPasswordScreen, LoginScreen, RecoveryPasswordScreen, RegisterScreen, ValidateMailScreen, ChatScreen, NotFoundScreen, ProfileScreen, ContactScreen, ModifyProfileScreen } from "./Screens"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx"
const App = () => {
    return (
        <div className='phone'>
            <Routes>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/verify-email/:validation_token" element={<ValidateMailScreen/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path="/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<ChatsScreen/>}/> 
                    <Route path="/chat/:contactId" element={<ChatScreen/>}/>
                    <Route path="/contact/:contactId" element={<ContactScreen/>}/>
                    <Route path="/profile" element={<ProfileScreen/>}/>   
                    <Route path="/profile/modify" element={<ModifyProfileScreen/>}/>
                </Route> 
                <Route path="*" element={<NotFoundScreen />}/>
            </Routes>
        </div>
    )
}

export default App
