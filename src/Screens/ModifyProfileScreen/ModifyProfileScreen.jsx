import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '../../Components'
import '../Screens.css'
import './modifyProfile.css'

const ModifyProfileScreen = () => {
    
    const [errorState, setError] = useState({
        thumbnail: undefined,
        telephone: undefined,
        public_state: undefined,
        description_content: undefined,
        address_content: undefined
    })
    const form_fields = [
        {
            label_text: 'Imagen:',
            field_component: 'INPUT_IMAGE',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-modify',
                type: 'file',
                accept: 'image/*',
                id: 'thumbnail',
                name: 'thumbnail'
            }
        },
        {
            label_text: 'Telefono:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-modify',
                type: 'tel',
                id: 'tel',
                name: 'telephone',
                placeholder: '62294378'
            }
        },
        {
            label_text: 'Estado:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-modify',
                type: 'text',
                id: 'text',
                name: 'public_state',
                placeholder: 'conectado'
            }
        },
        {
            label_text: 'Descripcion:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-modify',
                type: 'text',
                id: 'text',
                name: 'description_content',
                placeholder: 'Me gusta el arte....'
            }
        },
        {
            label_text: 'Direccion:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                className: 'input-modify',
                type: 'text',
                id: 'text',
                name: 'address_content',
                placeholder: '9 de Julio'
            }
        },
    ]

    const initial_state_form = {
        thumbnail: "",
        telephone: "",
        public_state: "",
        description_content: "",
        address_content: ""
    }

    const navigate  = useNavigate()
    const handleModify = async (formState) =>{
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${sessionStorage.getItem('user-id')}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
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
            case 200:
                navigate("/profile")
                break;
        }
    }
    
    return (
        <div className='container-modify' style={{height:'100%'}}>
            <h1 className='title-modify'>Perfil</h1>
            <Form className='form-modify' form_fields={form_fields} action={handleModify} initial_state_form={initial_state_form} error={errorState}>
                <button className='button-modify' type='submit'>Modificar</button>
            </Form>
            <Link className='link-modify' to='/profile'>Cancelar</Link>
        </div>
    )
}

export default ModifyProfileScreen