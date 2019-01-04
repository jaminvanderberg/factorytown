import { Item } from './item.jsx';

export class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSimple = this.toggleSimple.bind(this);
        this.toggleRenewable = this.toggleRenewable.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setCoin = this.setCoin.bind(this);

        this.setSort = this.setSort.bind(this);

        this.state = { 
            simple: true,
            renewable: false,
            category: null,
            coin: null,
            sortby: 'category_ordering', 
            secondary: 'percent', 
            asc: true 
        }
    }

    toggleSimple() {
        this.setState({ simple: !this.state.simple });
    }
    toggleRenewable() {
        this.setState({ renewable: !this.state.renewable });
    }
    setCategory(id, name, image) {
        if (id == null) { this.setState({ category: null }); return; }
        this.setState({ category: { id: id, name: name, image: image } });
    }
    setCoin(id, name, image) {
        if (id == null) { this.setState({ coin: null }); return; }
        this.setState({ coin: { id: id, name: name, image: image } });
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
        var self=this;

        return (
            <span>
                <div className="card my-2">
                    <div className="card-body px-1 py-2">
                        <div className="row px-3">
                            <div className="col-3 h5 mb-0 text-left pt-2">
                                <span className="switch switch-sm">
                                    <input type="checkbox" className="switch switch-sm" id="simple" 
                                        checked={this.state.simple} onChange={this.toggleSimple} 
                                    />
                                    <label htmlFor="simple">Exclude Simple</label>
                                </span>
                            </div>
                            <div className="col-3 h5 mb-0 text-left pt-2">
                                <span className="switch switch-sm">
                                    <input type="checkbox" className="switch switch-sm" id="renewable" 
                                        checked={this.state.renewable} onChange={this.toggleRenewable}
                                    />
                                    <label htmlFor="renewable">Renewable Only</label>
                                </span>
                            </div>
                            <div className="col-3 h5 mb-0">
                                {this.renderDropdown(this.props.categories, 'category', this.state.category, "-- Category --", this.setCategory)}
                            </div>
                            <div className="col-3 h5 mb-0">
                                {this.renderDropdown(this.props.coins, 'coin', this.state.coin, "-- Coin --", this.setCoin)}
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
                            ((!this.state.simple || item.complexity > 2)
                                && (!this.state.renewable || item.renewable) 
                                && (this.state.category == null || item.category_id == this.state.category.id)
                                && (this.state.coin == null || item.coin_id == this.state.coin.id)
                                && <Item key={item.id} item={item} onSelect={() => this.props.onSelectItem(item.id)} />)
                        )}
                    </ul>
                </div>  
            </span>
        );          
    }

    renderDropdown(list, folder, current, blank, callback) {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="category"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                >
                    {current == null ? <span className="pr-2">{blank}</span> :
                        <span className="pr-2">
                            <img className="icon-small" src={"image/" + folder + "/" + current.image} />
                            <span className="pl-1">{current.name}</span>
                        </span>
                    }
                </button>
                <div className="dropdown-menu" aria-labelledby="category">
                    <a className="dropdown-item" href="#" onClick={() => callback(null)}>
                        <img className="icon-small" src={"image/blank.png"} />
                        <span className="pl-1">-- No Filter --</span>
                    </a>
                    {list.map((i) =>
                        <a className="dropdown-item" key={i.id} href="#" onClick={() => callback(i.id, i.name, i.image)}>
                            <img className="icon-small" src={"image/" + folder + "/" + i.image} />
                            <span className="pl-1">{i.name}</span>
                        </a>
                    )}
                </div>
            </div>
        );
    }
}
