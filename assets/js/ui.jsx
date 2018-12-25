import { Item } from './itemlist/item.jsx';

export class UI extends React.Component {
  render() {
    const items = this.props.items;
    const itemlist = items.map((item) =>
      <Item key={item.id} item={item} />
    );
    return itemlist;
  }
}


