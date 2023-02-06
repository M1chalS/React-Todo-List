import {ListItem} from "./ListItem.jsx";

const List = ({content, title, done}) => {
    return (
        <div className="flex flex-col items-center mt-4">
            <h1 className="text-2xl text-green-700">{title}</h1>
            {content && content.map(item => {
                if(done !== item.done) {
                    return;
                }

                return <div key={ item.id }>
                    <ListItem item={ item }/>
                </div>;
            })}
        </div>
    );
}

export default List;