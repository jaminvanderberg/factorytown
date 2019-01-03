import { Item } from './item.jsx';

export class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.setSort = this.setSort.bind(this);

        this.state = { sortby: 'category_ordering', secondary: 'percent', asc: true }
    }

    setSort(field, secondary) {
        var asc = true;
        if (this.state.sortby == field && this.state.asc == true) { asc = false; }
        this.setState({ sortby: field, asc: asc, secondary: secondary });
    }

    render() {
        const items = Object.keys(this.props.items).map(k => this.props.items[k]);
        const sortby = this.state.sortby;
        const sec = this.state.secondary;
        const asc = this.state.asc;

        items.sort(function (a, b) {
            if (sortby == 'name') { return (asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)); }
            if (a[sortby] == b[sortby]) {
                if (a[sec] == b[sec]) {
                    return (asc ? a.ordering - b.ordering : b.ordering - a.ordering);
                }
                return (asc ? a[sec] - b[sec] : b[sec] - a[sec]);
            }
            return (asc ? a[sortby] - b[sortby] : b[sortby] - a[sortby]);
        });

        var sorticon = <img src={"image/svg/octicons/" + (this.state.asc ? 'triangle-down.svg' : 'triangle-up.svg')} className="pl-1" />;

        return (
            <span>
                <div className="card my-2">
                    <div className="card-body p-1 pt-2">
                        <div className="row px-3">
                            <div className="col-3 h5 mb-0 text-left">
                                <span className="switch switch-sm">
                                    <input type="checkbox" className="switch switch-sm" id="simple" />
                                    <label htmlFor="simple">Exclude Simple</label>
                                </span>
                            </div>
                            <div className="col-3 h5 mb-0 text-left">
                                <span className="switch switch-sm">
                                    <input type="checkbox" className="switch switch-sm" id="renewable" />
                                    <label htmlFor="renewable">Renewable Only</label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card my-2">
                    <h5 className="card-header text-center p-1">
                        <div className="row px-3">
                            <div className="col-4 h5 mb-0 text-left"><a href="#" onClick={() => this.setSort('name')}>Item{this.state.sortby == 'name' && sorticon}</a></div>
                            <div className="col-2 h5 mb-0 text-center"><a href="#" onClick={() => this.setSort('category_ordering', 'percent')}>Category{this.state.sortby == 'category_ordering' && sorticon}</a></div>
                            <div className="col-2 h5 mb-0 text-right"><a href="#" onClick={() => this.setSort('coin_ordering', 'sell')}>Sell Price{this.state.secondary == 'sell' && sorticon}</a></div>
                            <div className="col-2 h5 mb-0 text-right"><a href="#" onClick={() => this.setSort('complexity', 'ordering')}>Complexity{this.state.sortby == 'complexity' && sorticon}</a></div>
                            <div className="col-2 h5 mb-0 text-right"><a href="#" onClick={() => this.setSort('coin_ordering', 'sellcomp')}>Compl/Sell{this.state.secondary == 'sellcomp' && sorticon}</a></div>
                        </div>
                    </h5>
                    <ul className="list-group list-group-flush">
                        {items.map((item) =>
                            ((!item.simple || item.simple) && <Item key={item.id} item={item} onSelect={() => this.props.onSelectItem(item.id)} />)
                        )}
                    </ul>
                </div>  
            </span>
        );          
    }
}
