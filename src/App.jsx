import reactIcon from './assets/react.svg';
import CreateForm from "./components/CreateForm.jsx";
import {useEffect, useState} from "react";
import todo from "./api/todo.js";

const App = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await todo.get('/api/todos');
            setList(response.data);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const addTodo = async (content) => {
        const response = await todo.post('/api/todos', {content});

        const updatedList = [
            ...list,
            response.data
        ];

        setList(updatedList);
    }

    return (<div>
            <div className="flex flex-row justify-center content-center mt-2 p-2">
                <img src={reactIcon} alt="React" className="w-10 animate-spin-slow"/>
                <h1 className="text-4xl">Todo List🗂️</h1>
            </div>
            <div className="w-full">
                <CreateForm onSubmit={addTodo}/>
                <div>
                    {list && list.map(item => <div key={item.content}>{item.content}</div>)}
                </div>
            </div>
        </div>
    )

}

export default App;