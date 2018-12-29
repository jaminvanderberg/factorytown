import { ItemTree } from './itemtree.jsx';

export class ItemCalc extends React.Component {
    calc(items, item, qty, critical_time) {
        if (typeof items[item] == 'undefined') { return { error: "No item: " + item }; }
        var recipe = items[item].recipe;
        
        var roqty = 0;
        for(var o in recipe.output) {
            if (recipe.output[o].item == item) {
                roqty = recipe.output[o].qty;
            }
        }

        var ct, per;
        if (typeof critical_time == 'undefined') {
            ct = recipe.time / roqty * 1.00;
            per = 1.00;
        } else {
            ct = critical_time / qty * roqty;
            per = recipe.time / (critical_time / qty * roqty)
        }

        var ret = { item: items[item], qty: qty, per: per, critical_time: ct, children: [] };
        for (var i in recipe.ingredients) {
            var ing = recipe.ingredients[i];
            ret.children.push(this.calc(items, ing.item, ing.qty, ct));
        }
        return ret;
    }

    render() {
        var tree = this.calc(this.props.items, this.props.item, 1);

        return (
            <div>
                <a href="#" onClick={this.props.onBack}>Back</a>
                <ItemTree tree={tree} indent={0} />
            </div>
        );
    }
}
