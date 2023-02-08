import { ListItem } from "./ListItem.jsx";
import { MdEdit } from "react-icons/all";
import { useState } from "react";

const List = ({ content, title, done }) => {
    const [ edit, setEdit ] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="w-72 text-green-700 flex flex-row justify-between">
                <h3 className="ml-2 text-3xl font-semibold">{ title }</h3>
                <MdEdit className="text-2xl text-yellow-600 cursor-pointer"
                        onClick={ handleEdit }
                />
            </div>
            { content && content.map(item => {
                if (done !== item.done) {
                    return;
                }

                return <div key={ item.id }>
                    <ListItem item={ item } editMode={ edit }/>
                </div>;
            }) }
        </div>
    );
};

export default List;