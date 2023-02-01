import reactIcon from './assets/react.svg';
import {IoIosAddCircle} from "react-icons/all";

const App = () => {
    return (<div>
            <div className="flex flex-row justify-center content-center mt-2 p-2">
                <img src={reactIcon} alt="React" className="w-10 animate-spin-slow"/>
                <h1 className="text-4xl">Todo List🗂️</h1>
            </div>
            {/*<div className="flex">*/}
            {/*    <div className="flex-row">*/}
            {/*        <input className="m-auto" value="test"/>*/}
            {/*        <IoIosAddCircle/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )

}

export default App;