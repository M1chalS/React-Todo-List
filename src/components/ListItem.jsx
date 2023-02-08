import { BsCheck, MdDelete } from "react-icons/all";
import todo from "../api/todo.js";
import TodoContext from "../context/todo.jsx";
import { useContext, useState } from "react";
import classNames from "classnames";

export const ListItem = ({ item, editMode }) => {

    const [ text, setText ] = useState(item.content);
    const { dispatch } = useContext(TodoContext);
    const handleDone = async () => {
        try {
            const response = await todo.patch(`/api/todos/done/${ item.id }`);
            dispatch({ type: 'done', payload: response.data.id });
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleDelete = async () => {
        try {
            await todo.delete(`/api/todos/${ item.id }`);
            dispatch({ type: 'remove', payload: item.id });
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleBlur = async () => {
        try {
            const response = await todo.patch(`/api/todos/${ item.id }`, {
                content: text
            });
            dispatch({ type: 'update', payload: response.data });
        } catch (e) {
            console.log(e.message);
        }
    };

    let content;
    if (!item.done) {
        content = <>
            { editMode ?
                <MdDelete className="text-red-500 text-2xl cursor-pointer hover:scale-110"
                          onClick={ handleDelete } title="Delete"/> :
                <BsCheck className="text-green-500 text-2xl cursor-pointer hover:scale-125"
                         onClick={ handleDone } title="Mark as done"/> }
        </>;
    } else {
        content = <>
            { editMode &&
                <MdDelete className="text-red-500 text-2xl cursor-pointer hover:scale-110"
                          onClick={ handleDelete } title="Delete"/> }
        </>;
    }

    const mainClasses = classNames(
        'my-2 p-2 border w-72 flex justify-between rounded',
        {
            'border-green-900': item.done,
            'border-gray-500': !item.done,
            'border-yellow-700': editMode
        }
    );

    return (
        <div className={ mainClasses }>
            { !item.done && editMode ?
                <input className="w-60"
                       onChange={ (event) => setText(event.target.value) }
                       value={ text }
                       onBlur={ handleBlur }
                /> : <p>{ item.content }</p> }
            <div className="flex justify-center items-center">
                { content }
            </div>
        </div>
    );
};