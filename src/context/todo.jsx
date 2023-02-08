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
        case 'update':
            return {
                ...state,
                list: state.list.map((item) => {
                    if (item.id === action.payload.id) return action.payload
                    return item;
                })
            }
        case 'remove':
            return {
                ...state,
                list: state.list.filter((item) => {
                    return item.id !== action.payload
                }),
            }
        case 'done':
            return {
                ...state,
                list: state.list.map((item) => {
                    if (item.id === action.payload) return { ...item, done: true }
                    return item;
                })
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