import {MdAdd} from "react-icons/all";
import { useContext, useState } from "react";
import Button from "./Button.jsx";
import todo from "../api/todo.js";
import TodoContext from "../context/todo.jsx";

const CreateForm = () => {
    const [content, setContent] = useState("");
    const { dispatch } = useContext(TodoContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(content !== "") {
            setIsLoading(true);
            try {
                const response = await todo.post('/api/todos', { content });
                dispatch({ type: 'add', payload: response.data });
                setContent("");
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                console.log(e.message);
            }
        }
    };

    return (
        <div className="flex flex-row justify-center">
            <div className="border-2 border-solid border-gray-400 rounded-md">
                <form
                    className="flex"
                    onSubmit={handleSubmit}
                >
                    <input value={content} onChange={handleChange} className="flex rounded-md"/>
                    <Button className="text-2xl text-gray-600" loading={isLoading}>
                        <MdAdd />
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CreateForm;