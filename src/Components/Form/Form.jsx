import React from 'react'
import useForm from '../../Hooks/useForm'

const Form = ({children, action, form_fields, initial_state_form, error}) => {    
    const {formState, handleChange, handleChangeImage} = useForm(initial_state_form)

    const handleSubmit = (e) => {
        e.preventDefault()
        action(formState)
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FieldList form_fields={form_fields} handleChange={handleChange} handleChangeImage={handleChangeImage} formState={formState} error={error}/>
            {children}
        </form>
    )
}

const FieldList = ({form_fields, handleChange, handleChangeImage, formState, error}) => {
    return(
        form_fields.map((field, index) => {
            return(
                <Field 
                key={index + field.field_data_props.name} 
                field={field} 
                handleChange={handleChange} 
                handleChangeImage={handleChangeImage}
                state_value={formState[field.field_data_props.name]}
                error={error[field.field_data_props.name]}
                />
            )
        })
    )
}

const Field = ({field, handleChange, handleChangeImage, state_value, error}) => {
    return (
        <>
            <div {...field.field_container_props}>
                {field.label_text && <label>{field.label_text}</label>}
                <>
                    {field.field_component === 'INPUT_IMAGE' && state_value && <img src={state_value} alt="" width={200}/>}
                    {field.field_component === 'INPUT_IMAGE' && <input {...field.field_data_props} onChange={(e) => handleChangeImage(e, field.field_data_props.name)} />}
                    {field.field_component === 'INPUT' && <input {...field.field_data_props} onChange={handleChange} value={state_value} />}
                </>
            </div>
            {
                error && error.map((e, index) => {
                    return(
                        <div key={index + field.field_data_props.name}><span>{e.message}</span></div>
                    )
                })
            }
        </>
    )
}

export default Form