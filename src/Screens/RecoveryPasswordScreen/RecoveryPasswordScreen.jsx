import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form } from '../../Components'
import '../Screens.css'

const RecoveryPasswordScreen = () => {
    const {reset_token} = useParams()

    const [error, setError] = useState({
        password: undefined
    })
    const [successState, setSuccess] = useState(false)

    const actionRecoveryPassword = async (form_state) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recovery-password`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reset_token: reset_token,
                    password: form_state.password,
                })
            }
        )
        const data = await responseHTTP.json()
        switch (responseHTTP.status) {
            case 400:
                setError(data.message)
                break;
            case 404:
                setError({email: [{message:"el token es invalido"}]})
                break;
            case 200:
                setSuccess(true)
                break;
        }
    }

    const form_fields = [
        {
            label_text: 'Ingresa tu nueva contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'password',
                id: 'password',
                name: 'password',
                placeholder: ''
            }
        }
    ]

    const initial_state_form = {
        password: ''
    }

    return (
        <div style={{height:'100%'}}>
            <h1>Modifica tu contraseña</h1>
            <Form action={actionRecoveryPassword} form_fields ={form_fields} initial_state_form={initial_state_form} error={error}>
                <button type='submit'>Restablecer</button>
            </Form>
            {successState && <span>Su contraseña ha sido restablecida correctamente</span>}
            <Link to='/login'>Iniciar Sesion</Link>
        </div>
    )
}

export default RecoveryPasswordScreen