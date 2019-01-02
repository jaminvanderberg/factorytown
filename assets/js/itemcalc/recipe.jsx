export class Recipe extends React.Component {
    constructor(props) { 
        super(props);
        this.toggleOpen = this.toggleOpen.bind(this);

        this.state = { open: true };
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
    }

    noImage(e) { e.target.src = "/image/no-image.png"; }

    render() {
        var indent = [];
        for (var i = 0; i < this.props.indent; i++) {
            indent.push(<span className="pr-4" />);
        }
        var icon = <img src="/image/svg/octicons/dash.svg" className="pr-1" />;
        if (this.props.recipe.children.length) {
            icon = <img src={"/image/svg/octicons/" + (this.state.open ? "chevron-down.svg" : "chevron-right.svg")} className="pr-1" />;
        }

        return (
            <span>
                <div className="row" onClick={this.toggleOpen}>
                    <div className="col-6 h5">
                        {indent}{icon}
                        <span className="pr-1">{this.props.recipe.qty}x</span>
                        <img className="icon-image" src={"/image/item/" + this.props.recipe.item.image} 
                            alt={this.props.recipe.item.name} title={this.props.recipe.item.name} 
                            onError={this.noImage}
                        />
                        <span className="px-1">{this.props.recipe.item.name}</span>
                        <span className="pr-1">(1/{Math.round(this.props.recipe.critical_time * 100) / 100.0} sec)</span>
                    </div>
                    <div className="col-6 h5">
                        <span className="qty pr-1">{Math.round(this.props.recipe.per * 100) / 100.0}x</span>
                        <img src={"/image/building/" + this.props.recipe.recipe.building_image} className="icon-image" 
                            alt={this.props.recipe.recipe.building_name} title={this.props.recipe.recipe.building_name}
                            onError={this.noImage}
                        />
                        <span className="px-1">{this.props.recipe.recipe.building_name}</span>
                        ({this.props.recipe.roqty > 1 && "" + this.props.recipe.roqty + " in "}{Math.round(this.props.recipe.recipe.time * 100) / 100.0} sec)
                    </div>
                </div>
                <span className={this.state.open ? "" : "d-none"}>
                    {this.props.recipe.children.map((recipe, index) => <Recipe key={index} recipe={recipe} indent={this.props.indent+1} />)}
                </span>
            </span>
        );
    }
}