export class ItemTree extends React.Component {
    render() {
        var indent = [];
        for (var i = 0; i < this.props.indent; i++) {
            indent.push(<span className="pl-3" />);
        }

        return (
            <span>
                <div class="row">
                    <div class="col-6 h5">
                        {indent}
                        {this.props.tree.qty}x
                        <img src={"/image/item/" + this.props.tree.item.image} />
                        {this.props.tree.item.name}
                        (1/{this.props.tree.critical_time} sec)
                    </div>
                    <div class="col-6">
                        {this.props.tree.per}x
                        <img src={"/image/building/" + this.props.tree.item.recipe.building_image} />
                        {this.props.tree.item.recipe.building_name}
                        ({this.props.tree.item.recipe.time} sec)
                    </div>
                </div>
                {this.props.tree.children.map((tree) => <ItemTree tree={tree} indent={this.props.indent+1} />)}
            </span>
        );
    }
}