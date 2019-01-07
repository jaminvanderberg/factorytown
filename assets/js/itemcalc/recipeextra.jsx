import { Helper } from '../helper.jsx';

export class RecipeExtra extends React.Component {
    render() {
        if (!Object.keys(this.props.extra).length) { return null; }

        var self = this;
        return (
            <div className="card m-4">
                <div className="card-header py-2 px-3 h5 mb-0">
                    Extra Items
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item py-1 pr-3 pl-1">
                        <div className="row">
                            {Object.keys(this.props.extra).map((e) =>
                                <div className="col-6 h6 mb-0">
                                    <span className="pr-1 qty">{self.props.extra[e].qty}x</span>
                                    <img src={"image/item/" + self.props.extra[e].item_image} className="icon-image"
                                        alt={self.props.extra[e].item_name} title={self.props.extra[e].item_name}
                                        onError={Helper.noImage}
                                    />
                                    <span className="px-1">{self.props.extra[e].item_name}</span>
                                    {self.props.extra[e].use_as_fuel < self.props.extra[e].fuel ?
                                        <span>(use {self.props.extra[e].use_as_fuel} as fuel)</span>
                                        : (self.props.extra[e].use_as_fuel > 0 ?
                                            <span>(use as fuel)</span>
                                            : null)
                                    }
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        );        
    }
}