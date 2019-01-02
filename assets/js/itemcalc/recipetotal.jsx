export class RecipeTotal extends React.Component {
    noImage(e) {
        if (e.target.src != "/image/no-image.png") {
            e.target.src = "/image/no-image.png";
        }
    }

    render() {
        return (
            <li className="list-group-item py-1 pr-3 pl-1">
                <div className="row">
                    <div className="col-6 h6 mb-0">
                        <span className="pr-1 qty">{this.props.total.qty}x</span>
                        <img src={"/image/item/" + this.props.total.item_image} className="icon-image" 
                            alt={this.props.total.item} title={this.props.total.item}
                            onError={this.noImage}
                        />
                        <span className="px-1">{this.props.total.item}</span>
                        (1/{Math.round((this.props.time / this.props.total.qty) * 100) / 100.0} sec)
                    </div>
                    <div className="col-6 h6 mb-0">
                        <span className="qty pr-1">{Math.round(this.props.total.per * 100) / 100.0}x</span>
                        <img src={"/image/building/" + this.props.total.building_image} className="icon-image"
                            alt={this.props.total.building} title={this.props.total.building}
                            onError={this.noImage}
                        />
                        <span className="px-1">{this.props.total.building}</span>
                        ({this.props.total.time} sec)                
                    </div>
                </div>
            </li>
        );
    }
}