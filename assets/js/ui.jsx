import { ItemList } from './itemlist/itemlist.jsx';
import { ItemCalc } from './itemcalc/itemcalc.jsx';

export class UI extends React.Component {
    constructor(props) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
        this.state = { item: '' };
    }

    selectItem(i) {
        this.setState({ item: i });
    }

    render() {
        return this.state.item == ''
            ? <ItemList items={this.props.items} onSelectItem={this.selectItem} />
            : <ItemCalc items={this.props.items} item={this.state.item} onBack={() => this.selectItem('')} />
        ;
    }
}


