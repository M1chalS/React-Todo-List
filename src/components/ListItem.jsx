import { BsCheck, BsCheckCircleFill, MdDelete, MdOutlineDeleteOutline } from "react-icons/all";
import todo from "../api/todo.js";
import TodoContext from "../context/todo.jsx";
import { useContext } from "react";
import classNames from "classnames";

export const ListItem = ({ item }) => {
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

    let content;
    if (!item.done) {
        content = <>
            <BsCheck className="text-green-500 text-2xl cursor-pointer" onClick={ handleDone } title="Mark as done"/>
            <MdOutlineDeleteOutline className="text-red-500 text-2xl cursor-pointer" onClick={ handleDelete }
                                    title="Delete"/>
        </>;
    } else {
        content = <>
            <BsCheckCircleFill title="Done" className="text-green-800 text-xl"/>
            <MdDelete className="text-red-500 text-2xl cursor-pointer" onClick={ handleDelete } title="Delete"/>
        </>;
    }

    const mainClasses = classNames(
        'my-2 p-2 border w-48 flex justify-between rounded',
        { 'border-green-900': item.done, 'border-gray-500': !item.done }
    );

    return (
        <div className={ mainClasses }>
            { item.content }
            <div className="flex justify-center items-center">
                { content }
            </div>
        </div>
    );
};