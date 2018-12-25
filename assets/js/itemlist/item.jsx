export class Item extends React.Component {
    render() {
        return (
            <button type="button" class="btn btn-light text-left w-100">
                <span class="h5" data-id={ this.props.item.id }>
                    <img src={"/image/item/" + this.props.item.image } /><span class="pl-1">{ this.props.item.name }</span>
                </span>
                { this.props.item.coin_name && 
                    <div class={ "float-right h-100 " + this.props.item.coin_class }>
                        <img class="coin-image" src={"/image/coin/" + this.props.item.coin_image } />
                        <strong>{ this.props.item.sell }</strong>
                    </div>
                }
            </button>
        );
    }
}
  