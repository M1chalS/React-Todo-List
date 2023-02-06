import reactIcon from './assets/react.svg';
import CreateForm from "./components/CreateForm.jsx";
import { useContext, useEffect } from "react";
import todo from "./api/todo.js";
import TodoContext from "./context/todo.jsx";
import List from "./components/List.jsx";

const App = () => {
    const { list, dispatch } = useContext(TodoContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await todo.get('/api/todos');
            dispatch({ type: 'fetchAll', payload: response.data });
        } catch (e) {
            throw new Error(e.message);
        }
    };

    const addTodo = async (content) => {
        const response = await todo.post('/api/todos', { content });
        dispatch({ type: 'add', payload: response.data });
    };

    return (<div>
            <div className="flex flex-row justify-center content-center mt-2 p-2">
                <img src={ reactIcon } alt="React" className="w-10 animate-spin-slow"/>
                <h1 className="text-4xl">Todo List🗂️</h1>
            </div>
            <div className="w-full flex-row">
                <CreateForm onSubmit={ addTodo }/>
                <List content={list} title="To do" done={false}/>
                <List content={list} title="Done" done/>
            </div>
        </div>
    );

};

export default App;