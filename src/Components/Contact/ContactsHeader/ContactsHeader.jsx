import React, { useState } from 'react'
import './ContactsHeader.css'
import { BsFillPersonVcardFill } from "react-icons/bs";
import { IoMdPersonAdd, IoMdSearch  } from "react-icons/io";
import { Link } from 'react-router-dom';

const ContactsHeader = ({setListaContactos}) => {

    const [searchStringState, setSearchString] = useState('')


    const handleChangeValue = (e) => {
        setSearchString(e.target.value)
    }

    const [showInput, setShowInput] = useState(false)

    return (
        <div className='contact-header-container'>
            <div className='contact-header-title'>
                <h2 className='contacts-header-contact'>Contactos</h2>
            </div>
            {showInput ? (
                <input
                className='input-filter'
                placeholder='Buscar contacto'
                onChange={handleChangeValue}
                value={searchStringState}
                onBlur={() => setShowInput(false)} // opcional: cerrar si hace blur
                autoFocus
                />
            ) : (
                <button className='search-icon-btn' onClick={() => setShowInput(true)}>
                <IoMdSearch />
                </button>
            )}
            <div className='contact-icons'>
                    <Link to="/contact/add" className='info-add-contact-icon'><IoMdPersonAdd /></Link>
                    <Link to="/profile" className='info-profile-icon'><BsFillPersonVcardFill /></Link>
            </div>
        </div>
    )
}

export default ContactsHeader