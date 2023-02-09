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
            <header className="flex flex-row justify-center content-center mt-2 p-2">
                <img src={ reactIcon } alt="React" className="w-10 animate-spin-slow"/>
                <h1 className="text-4xl">Todo List🗂️</h1>
            </header>
            <main className="w-full flex-row">
                <CreateForm onSubmit={ addTodo }/>
                <List content={list} title="To do" done={false}/>
                <List content={list} title="Done" done/>
            </main>
            <footer className="mt-8 mb-1 ml-2 flex justify-start items-center h-auto fixed bottom-0">
                <a href="https://github.com/M1chalS" target="_blank">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                         alt="Github"
                         className="w-8"
                    />
                </a>
                <p>Michał Szajner</p>
            </footer>
        </div>
    );

};

export default App;