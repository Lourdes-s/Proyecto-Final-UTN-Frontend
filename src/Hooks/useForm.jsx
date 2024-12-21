import { useState } from "react"

const useForm = (initialForm) => {
    //logica de formularios y estados
    const [formState, setFormState] = useState(initialForm)
    const handleChange = (evento) => {
        evento.target // es el elemento HTML que emitio el evento
        evento.target.value // el valor del elemento HTML que emitio el evento (el input)

        const field_name = evento.target.name
        const field_value = evento.target.value

        setFormState((prevFormState) => {
            return {...prevFormState, [field_name]: field_value}
        })
    }

    const handleChangeImage = (evento, field_name) => {
        const FILE_MB_LIMIT = 2

        const file = evento.target.files[0]

        if(file && file.size > FILE_MB_LIMIT * 1024 * 1024) {
            alert('El archivo es muy pesado')//todo improve??
        }


        const reader = new FileReader()

        reader.onloadend = () => {
            const image_base64 = reader.result
            setFormState(
                (prevFormState) => {
                    return {...prevFormState, [field_name]: image_base64}
                }
            ) 
        }

        if(file) {
            reader.readAsDataURL(file)
        }
    }

    return {
        formState, 
        handleChange,
        handleChangeImage
    }
}

export default useForm 