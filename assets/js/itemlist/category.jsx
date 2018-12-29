import { Item } from './item.jsx';

export class Category extends React.Component {

    render() {
        const category = this.props.category;

        return (
            <div className="card my-1">
                <h5 className="card-header text-center p-1">
                    <img src={"image/category/" + category.image} /> {category.name}
                </h5>
                <ul className="list-group list-group-flush">
                    {category.children.map((item) =>
                        <Item key={item.id} item={item} onSelect={() => this.props.onSelectItem(item.id)}/>
                    )}
                </ul>
            </div>
        );
    }
}