import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form} from '../../Components'
import '../Screens.css'
import './contactAdd.css'

const ContactAddScreen = () => {

    const [errorState, setError] = useState({
        email: undefined
    })

    const form_fields = [
        {
            label_text: 'Email del usuario que deseas agregar: ',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-add-contact', 
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'joedoe@example.com'
            }   
        }
    ]

    const initial_state_form = {
        email: ''
    }

    const navigate = useNavigate()
    const handlerAddContact = async (form_state) => {

        if (!form_state.email) {
            setError({ email: [{ message: "El correo electrónico es obligatorio." }] });
            return;
        }

    // Verificar si el correo electrónico pertenece a un usuario existente
    const userCheckResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/check-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: form_state.email })
    });

    if (userCheckResponse.status === 200) {
        const userExists = await userCheckResponse.json();
        if (!userExists) {
            setError({ email: [{ message: "El correo electrónico no está registrado como usuario." }] });
            return;
        }
    } else {
        setError({ general: [{ message: "Error al verificar el usuario." }] });
        return;
    }

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${sessionStorage.getItem('user-id')}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
                },
                body: JSON.stringify(form_state)    
            }
        )
        const data = await responseHTTP.json()
        switch (responseHTTP.status) {
            case 400:
                setError(data.message)
                break;
            case 404:
                setError({email: [{message:"email incorrecto"}]})
                break;
            case 500:
                setError('Algo salio mal')
                break;
            case 200:
                navigate("/")
                break;
        }
    }
    return (
        <div className='screen-add-contact'>
            <h1 className='title-add-contact'>Agregar contacto</h1>
            <Form className="form-add-contact" form_fields={form_fields} initial_state_form={initial_state_form} action={handlerAddContact} error={errorState} >
                <button className='button-add-contact'>Agregar</button>
            </Form>
            <Link className='link-add-contact' to="/">Cancelar</Link>
        </div>
    )
}

export default ContactAddScreen