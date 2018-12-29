import { Item } from './item.jsx';

export class ItemList extends React.Component {
    render() {
        const items = Object.keys(this.props.items).map(k => this.props.items[k]);
        items.sort(function (a, b) {
            if (a.category_ordering == b.category_ordering) {
                return a.ordering - b.ordering;
            }
            return a.category_ordering - b.category_ordering;
        });

        return (
            <div className="card my-1">
                <h5 className="card-header text-center p-1">
                    <div className="row px-3">
                        <div className="col-6 h5 mb-0 text-left">Item</div>
                        <div className="col-3 h5 mb-0 text-center">Category</div>
                        <div className="col-3 h5 mb-0 text-right">Sell Price</div>
                    </div>
                </h5>
                <ul className="list-group list-group-flush">
                    {items.map((item) =>
                        <Item key={item.id} item={item} onSelect={() => this.props.onSelectItem(item.id)} />
                    )}
                </ul>
            </div>  
        );          
    }
}
