import {MdAdd} from "react-icons/all";
import {useState} from "react";

const CreateForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(content);
        setContent("");
    };

    return (
        <div className="flex flex-row justify-center">
            <div className="border-2 border-solid border-gray-400 rounded-md">
                <form
                    className="flex"
                    onSubmit={handleSubmit}
                >
                    <input value={content} onChange={handleChange} className="flex rounded-md"/>
                    <button className="text-2xl cursor-pointer text-gray-600">
                        <MdAdd />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateForm;