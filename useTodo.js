import { useEffect, useReducer } from "react"
import { todoReducer } from "../08- useReducer/todoReducer"

export const useTodo = () => {

    // const initialState = []

    const init = () => {
        //trae todo lo que tenga el localstorage al iniciar
        return JSON.parse(localStorage.getItem('todos')) || []
    }

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    //Cuando hay un cambio en "todos" hay que ejecutar algo
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])

    const handleNewTodo = (todo) => {
        //Se crea la accion para enviar
        const action = {
            type: '[TODO] Add todo',
            payload: todo
        }

        //Y dispatch lo guarda
        dispatch(action)
    }

    const handleDeleteTodo = (id) => {
        // console.log(id);

        dispatch({ type: '[TODO] Remove todo', payload: id })
    }


    const handleToggleTodo = (id) => {
        // console.log({id});

        dispatch({ type: '[TODO] Toggle todo', payload: id })
    }
    
    // const todosCount = todos.length

    // const pendingTodos = todos.filter(todo => !todo.done).length

    return {
        todos,
        todosCount: todos.length,
        pendingTodos: todos.filter(todo => !todo.done).length,
        handleDeleteTodo,
        handleToggleTodo,
        handleNewTodo
    }
}
