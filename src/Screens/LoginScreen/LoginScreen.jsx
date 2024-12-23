import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '../../Components'
import { AuthContext } from '../../Context/AuthContext'
import '../Screens.css'
import './login.css'

const LoginScreen = () => {
    
    const [errorState, setError] = useState({
        email: undefined,
        password: undefined
    })
	const {login} = useContext(AuthContext)
    const form_fields = [
        {
            label_text: 'Email:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-login',
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'joedoe@example.com'
            }
        },
        {
            label_text: 'Contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-login',
                type: 'password',
                id: 'password',
                name: 'password'
            }
        }
    ]

    const initial_state_form = {
        email: "",
        password: ""
    }

    const handleLogin = async (formState) =>{
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState)
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
            case 401:
            case 403:
                setError({password: [{message:"email o contraseña incorrecto"}]})
                break;
            case 200:
                login(data.access_token, data.user.id)
                break;
        }
    }
    
    return (
        <div className='screen-login' style={{height:'100%'}}>
            <h1 className='title-login'>Inicia Sesion</h1>
            <Form className='form-login' form_fields={form_fields} action={handleLogin} initial_state_form={initial_state_form} error={errorState}>
                <button className='button-login' type='submit'>Iniciar Sesion</button>
            </Form>
            <Link  className='link-login' to='/forgot-password'>Olvide mi contraseña</Link>
        </div>
    )
}

export default LoginScreen