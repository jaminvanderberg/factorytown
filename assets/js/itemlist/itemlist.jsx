import { Item } from './item.jsx';
import { DropDown } from './dropdown.jsx';

export class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSimple = this.toggleSimple.bind(this);
        this.toggleRenewable = this.toggleRenewable.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setCoin = this.setCoin.bind(this);
        this.search = this.search.bind(this);
        this.reset = this.reset.bind(this);

        this.setSort = this.setSort.bind(this);

        this.defaultState = {
            simple: false,
            renewable: false,
            category: null,
            coin: null,
            sortby: 'category_ordering',
            secondary: 'percent',
            asc: true,
            search: ''
        };        

        this.state = this.defaultState;
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

    search(e) {
        this.setState({ search: e.target.value });
    }
    reset() { this.setState(this.defaultState); }

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
                                <DropDown list={this.props.categories} folder="category" current={this.state.category} blank="-- Category --" onSelect={this.setCategory} />
                            </div>
                            <div className="col-3 h5 mb-0">
                                <DropDown list={this.props.coins} folder="coin" current={this.state.coin} blank="-- Coin --" onSelect={this.setCoin} />
                            </div>                            
                        </div>
                        <div className="row px-3 pt-2">
                            <div className="col-9 h5 mb-0 text-left form-group">
                                <input type="text" className="form-control" id="search" placeholder="Search" onChange={this.search} value={this.state.search} />
                            </div>
                            <div className="col-3 h5 mb-0">
                                <button type="button" class="btn btn-outline-secondary w-100" onClick={this.reset}>Reset Filters</button>
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
                                && (this.state.search == '' || item.name.toUpperCase().includes(this.state.search.toUpperCase()))
                                ? <Item key={item.id} item={item} onSelect={() => this.props.onSelectItem(item.id)} /> : null)
                        )}
                    </ul>
                </div>  
            </span>
        );          
    }
}
