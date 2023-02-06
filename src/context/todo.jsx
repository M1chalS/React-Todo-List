import { createContext, useReducer } from "react";


const TodoContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'fetchAll':
            return {
                ...state,
                list: action.payload
            };
        case 'add':
            return {
                ...state,
                list: [ ...state.list, action.payload ],
            }
        case 'remove':
            return {
                ...state,
                list: state.list.filter((item) => {
                    return item.id !== action.payload
                }),
            }
        default:
            return state;
    }
};

const TodoProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(reducer, { list: [] });

    return <TodoContext.Provider value={ { list: state.list, dispatch } }>
        { children }
    </TodoContext.Provider>;
};

export { TodoProvider };
export default TodoContext;