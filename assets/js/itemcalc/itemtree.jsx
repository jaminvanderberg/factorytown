import { Recipe } from './recipe.jsx';
import { RecipeTotal } from './recipetotal.jsx';

export class ItemTree extends React.Component {
    constructor(props) {
        super(props);

        this.toggleOpen = this.toggleOpen.bind(this);
    }
 
    toggleOpen() {
        if (this.props.open) {
            this.props.setOpen(-1);
        } else {
            this.props.setOpen(this.props.index);
        }
    }

    render() {
        return (
            <li className="list-group-item" onClick={this.toggleOpen}>
                <div className="h4">
                    <span className="pr-1">
                        <img src={"/image/svg/octicons/" + (this.props.open ? "diff-removed.svg" : "diff-added.svg")} />
                    </span>
                    Complexity: {this.props.tree.complexity}, Base Items: {(Object.keys(this.props.tree.base).sort()).map((b) => this.props.tree.base[b].name).join(', ')}
                </div>
                <span className={this.props.open ? "" : "d-none"}>
                    <div className="list-group-item"><Recipe recipe={this.props.tree} indent={0} /></div>

                    <div className="card m-4">
                        <div className="card-header py-2 px-3 h5 mb-0">
                            Totals (1 {this.props.tree.item.name}/{Math.round(this.props.tree.recipe.time * 100) / 100.0} sec)
                        </div>
                        <ul className="list-group list-group-flush">
                            {Object.keys(this.props.tree.total).map((t) => <RecipeTotal key={t} time={this.props.tree.recipe.time} total={this.props.tree.total[t]} />)}
                        </ul>
                    </div>
                </span>
            </li>        
        );
    }
}