import React, { useState } from 'react'
import { VscSend } from "react-icons/vsc";
import './MensajeForm.css'

const MensajeForm = ({handleSubmitNewMessage}) => {
    const [inputValue, setInputValue] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()  
        if (inputValue.trim() === '') {
            return; 
        }
        handleSubmitNewMessage(e)
        setInputValue('')
        
    }
    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }
    return (
        <div  className='form-message'>
            <form onSubmit={handleSubmit} name='text' className='form'>
                <input className="input-text" type="text" id='mensaje' name='mensaje' placeholder="Escribe un mensaje..." value={inputValue} onChange={handleOnChange}/>
                <button className="button-submit" type='submit'>
                    <VscSend className="icon-send" />
                    </button>
            </form>
        </div>
    )
}

export default MensajeForm