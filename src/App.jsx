import reactIcon from './assets/react.svg';
import CreateForm from "./components/CreateForm.jsx";
import {useState} from "react";

const App = () => {
    const [list, setList] = useState([]);
    
    const addTodo = (content) => {
        const updatedList = [
            {content},
            ...list
        ];

        setList(updatedList);
    }

    console.log(list);
    
    return (<div>
            <div className="flex flex-row justify-center content-center mt-2 p-2">
                <img src={reactIcon} alt="React" className="w-10 animate-spin-slow"/>
                <h1 className="text-4xl">Todo List🗂️</h1>
            </div>
            <div className="w-full">
                <CreateForm onSubmit={addTodo}/>
                <div>
                    {list.map(item => <div key={item.content}>{item.content}</div>)}
                </div>
            </div>
        </div>
    )

}

export default App;