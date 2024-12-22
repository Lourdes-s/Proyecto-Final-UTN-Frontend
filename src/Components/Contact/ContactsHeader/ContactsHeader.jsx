import React, { useState } from 'react'
import './ContactsHeader.css'
import { BsFillPersonVcardFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const ContactsHeader = ({setListaContactos}) => {

    const [searchStringState, setSearchString] = useState('')


    const handleChangeValue = (e) => {
        setSearchString(e.target.value)
    }

    return (
        <div className='contact-header-container'>
            <div className='contact-header-title'>
                <h2 className='contacts-header-contact'>Contactos</h2>
            </div>
            <input
                className='input-filter'
                placeholder='Buscar contacto'
                onChange={handleChangeValue}
                value={searchStringState}
            />
            <Link to="/profile" className='info-profile-icon'><BsFillPersonVcardFill /></Link>
        </div>
    )
}

export default ContactsHeader