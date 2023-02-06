import {BsCheck, MdOutlineDeleteOutline} from "react-icons/all";
import todo from "../api/todo.js";

export const ListItem = ({item}) => {

    const handleDone = async () => {
        //TODO Logic for marking item as done
        try {
            const response = await todo.patch(`/api/todos/done/${item.id}`);
            console.log(response.data);
        }
        catch (e) {
            console.log(e.message);
        }
    };

    const handleDelete = () => {
        //TODO Logic for deleting item
    };

    return (
        <div className="my-2 p-2 border w-48 flex justify-between rounded">
            {item.content}
            <div className="flex justify-center">
                <BsCheck className="text-green-500 text-2xl cursor-pointer" onClick={handleDone}/>
                <MdOutlineDeleteOutline className="text-red-500 text-xl cursor-pointer" onClick={handleDelete}/>
            </div>
        </div>
    );
}