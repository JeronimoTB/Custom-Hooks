import { useState } from "react"

export const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({ target }) => {
        const { name, value } = target

        setFormState({
            ...formState,
            [name]: value
        })
    }
    const onResetForm = () => {
        setFormState(initialForm)
    }

    // ASI LO HICE YO ---------------------
    // const onResetForm = () => {
    //     setFormState({
    //         username: '',
    //         email: '',
    //         password: ''
    //     })
    // }


  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  }
}
