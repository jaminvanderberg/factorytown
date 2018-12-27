export class Item extends React.Component {
    render() {
        const item = this.props.item;

        return (
            <div className="w-100">
                <div className="row">
                    <div className="col-6 h6 mb-0" data-id={item.id}>
                        <img src={"/image/item/" + item.image} /> {item.name}
                    </div>
                    <div className="col-3 h6 mb-0 text-center">
                        <img src={"/image/category/" + item.category_image} alt={item.category_name} /> {item.percent ? item.percent + "%" : ""}
                    </div>
                    {item.coin_name && 
                        <div className={"col-3 h6 mb-0 text-right " + item.coin_class}>
                            <img className="coin-image" src={"/image/coin/" + item.coin_image} />
                            <strong>{item.sell}</strong>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
  