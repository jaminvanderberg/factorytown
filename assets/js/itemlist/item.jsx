export class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false }
    }

    setHover(h) {
        this.setState({ hover: h });
    }

    noImage(e) { e.target.src = "/image/no-image.png"; }    

    render() {
        const item = this.props.item;

        return (
            <li key={item.id} className={"list-group-item py-1 px-3 hover-link" + (this.state.hover && " list-group-item-primary")} onClick={this.props.onSelect}
                onMouseEnter={() => this.setHover(true)} onMouseLeave={() => this.setHover(false)}
            >
                <div className="row">
                    <div className="col-4 h6 mb-0" data-id={item.id}>
                        <img className="icon-image" src={"/image/item/" + item.image} onError={this.noImage} alt={item.name} title={item.name} />
                        <span className="pl-1">{item.name}</span>
                    </div>
                    <div className="col-2 h6 mb-0 text-center">
                        {item.category_image ? <img src={"/image/category/" + item.category_image} alt={item.category_name} title={item.category_name}/> : item.category_name}
                        {item.percent ? item.percent + "%" : ""}
                    </div>
                    <div className={"col-2 h6 mb-0 text-right " + item.coin_class}>
                        {item.coin_name && 
                            <span>
                                <img className="coin-image" src={"/image/coin/" + item.coin_image} alt={item.coin_name} title={item.coin_name} />
                                <strong>{item.sell}</strong>
                            </span>
                        }
                    </div>
                    <div className="col-2 h6 mb-0 text-right">
                        <img className="icon-image" src="/image/blank.png" />{item.complexity}
                    </div>
                    <div className="col-2 h6 mb-0 text-right">
                        <img className="icon-image" src="/image/blank.png" />{Math.round(item.sellcomp * 100) / 100.0}
                    </div>
                </div>
            </li>
        );
    }
}
  