import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '../../Components'

const ForgotPasswordScreen = () => {
    const [errorState, setError] = useState({
        email: undefined
    })
    const [successState, setSuccess] = useState(false)

    const form_fields = [
        {
            label_text: 'Ingresa el email de recuperacion:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
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

    const submitForgotPassword = async (form_state) => {
        setSuccess(false)
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form_state.email,
                })
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
            case 200:
                setSuccess(true)
                break;
        }
    }

    return (
        <div>
            <h1>Restablecer contraseña</h1>
            <p>Al restablecer tu contraseña se enviara un correo electronico a tu cuenta para que puedas restablecer tu contraseña</p>
            <Form form_fields={form_fields} action={submitForgotPassword} initial_state_form={initial_state_form} error={errorState}> 
                <button type='submit'> Restablecer </button>
            </Form>
            {successState && <span>El email para recuperar su contraseña ha sido envio correctamente</span>}
            <Link to='/login'>Iniciar Sesion</Link>
        </div>
    )
}

export default ForgotPasswordScreen