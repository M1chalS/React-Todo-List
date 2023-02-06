import {ListItem} from "./ListItem.jsx";

const List = ({content}) => {
    return (
        <div className="flex flex-col items-center mt-4">
            {content && content.map(item => <div key={item.id}>
                    <ListItem item={item}/>
                </div>
            )}
        </div>
    );
}

export default List;