

export const todoReducer = (initialState = [], action) => {

    switch (action.type) {
        case '[TODO] Add todo':
            //Se evita el push o la mutacion de arreglo
            //Trayendo la copia del array y agregando el nuevo con la accion
            return [...initialState, action.payload]

        case '[TODO] Remove todo':
            return initialState.filter(todo => todo.id !== action.payload)

        case '[TODO] Toggle todo':
            return initialState.map(todo => { //Recorre el arreglo
                if (todo.id === action.payload) { //Si el id es igual al payload
                    return { //Retorna el objeto y cambia el done
                        ...todo,
                        done: !todo.done 
                        //Se pone el contrario, si es true pasa a false, y al reves
                    }
                }
                return todo

            })
        default:
            return initialState
    }
}