import { BsCheck, MdDelete } from "react-icons/all";
import todo from "../api/todo.js";
import TodoContext from "../context/todo.jsx";
import { useContext, useState } from "react";
import classNames from "classnames";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

export const ListItem = ({ item, editMode }) => {

    const [ text, setText ] = useState(item.content);
    const { dispatch } = useContext(TodoContext);
    const [ isLoading, setIsLoading ] = useState(false);

    const [ showModal, setShowModal ] = useState(false);
    const handleDone = async () => {
        setIsLoading(true);
        try {
            const response = await todo.patch(`/api/todos/done/${ item.id }`);
            dispatch({ type: 'done', payload: response.data.id });
            setIsLoading(false);
        } catch (e) {
            console.log(e.message);
            setIsLoading(false);
        }
    };

    const handleUndone = async () => {
        setIsLoading(true);
        try {
            const response = await todo.patch(`/api/todos/undone/${ item.id }`);
            dispatch({ type: 'undone', payload: response.data.id });
            setIsLoading(false);
        } catch (e) {
            console.log(e.message);
            setIsLoading(false);
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
        if(text !== "") {
            try {
                const response = await todo.patch(`/api/todos/${ item.id }`, {
                    content: text
                });
                dispatch({ type: 'update', payload: response.data });
            } catch (e) {
                console.log(e.message);
            }
        }
    };

    const handleShow = async () => {
        setShowModal(true);
    };

    let content;
    if (!item.done) {
        content = <>
            { editMode ?
                <MdDelete className="text-red-500 text-2xl cursor-pointer hover:scale-110"
                          onClick={ handleDelete } title="Delete"/> :
                <Button className="text-green-500 text-2xl"
                        onClick={ handleDone }
                        title="Mark as done"
                        loading={isLoading}
                >
                    <BsCheck/>
                </Button>
                 }
        </>;
    } else {
        content = <>
            { editMode &&
                <MdDelete className="text-red-500 text-2xl cursor-pointer hover:scale-110"
                          onClick={ handleDelete } title="Delete"/> }
        </>;
    }

    const mainClasses = classNames(
        'h-auto my-2 p-2 border w-72 flex justify-between rounded',
        {
            'border-green-900': item.done,
            'border-gray-500': !item.done,
            'border-yellow-700': editMode
        }
    );

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className={ mainClasses }>

            { !item.done && editMode ?
                <input className="w-60 border rounded-md"
                       onChange={ (event) => setText(event.target.value) }
                       value={ text }
                       onBlur={ handleBlur }
                /> : <a onClick={ handleShow } className="truncate w-60 cursor-pointer">{ item.content }</a> }
            <div className="flex justify-center items-center">
                { content }
            </div>
            { showModal && <Modal onClose={ handleClose } actionBar={ <button
                onClick={ handleClose } className="text-lg hover:scale-105">Ok</button> }>
                <div className="flex justify-between">
                    <div className="w-2/3">
                        <h2 className="text-xl">Your assigment:</h2>
                        <p className="h-auto break-words">{ item.content }</p>
                    </div>
                    {item.done ? <Button className="text-xl" onClick={handleUndone}>Not done</Button> : <Button className="text-xl" onClick={handleDone}>Done?</Button>}
                </div>
            </Modal> }
        </div>
    );
};