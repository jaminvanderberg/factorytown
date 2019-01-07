import { Helper } from '../helper.jsx';

export class RecipeCost extends React.Component {

    render() {
        if(!Object.keys(this.props.cost).length && !this.props.fuel) { return null; }

        var self = this;
        return (
            <div className="card m-4">
                <div className="card-header py-2 px-3 h5 mb-0">
                    Costs
                        </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item py-1 pr-3 pl-1">
                        <div className="row px-4">
                            {Object.keys(this.props.cost).map((c) =>
                                <span className={"mx-2 " + self.props.cost[c].coin_class} >
                                    <img src={"image/coin/" + self.props.cost[c].coin_image} className="icon-image"
                                        onError={Helper.noImage}
                                    />
                                    <strong className="pl-1">{self.props.cost[c].cost}</strong>
                                </span>
                            )}
                            {this.props.fuel &&
                                <span className="ml-2">
                                    <img className="icon-image" src="image/fuel.png" alt="Fuel" title="Fuel" />
                                    <strong className="pl-1">{this.props.fuel}</strong>
                                </span>
                            }
                        </div>
                    </li>
                </ul>
            </div>
        );    
    }
}