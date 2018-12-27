import { Category } from './itemlist/category.jsx';

export class UI extends React.Component {
  render() {
    const items = Object.keys(this.props.items).map(k => this.props.items[k]);
    items.sort(function(a, b) {
      if (a.category_ordering == b.category_ordering) {
        return a.ordering - b.ordering;
      }
      return a.category_ordering - b.category_ordering;
    });
    var category = {};
    for (var i in items) {
      var item = items[i];
      if (!category.hasOwnProperty(item.category_name)) {
        category[item.category_name] = {
          "name": item.category_name,
          "image": item.category_image,
          "children": []
        }
      }
      category[item.category_name].children.push(item);
    }

    return Object.keys(category).map((k) => <Category key={k} category={category[k]} />);
  }
}


