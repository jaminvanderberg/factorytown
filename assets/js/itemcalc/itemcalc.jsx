import { Calc } from '../calc.jsx';
import { ItemTree } from './itemtree.jsx';

export class ItemCalc extends React.Component {
    constructor(props) {
        super(props);

        this.setMult = this.setMult.bind(this);
        this.setOpen = this.setOpen.bind(this);

        this.state = ({
            mult: 1,
            open: 0
        });
    }

    setMult(e) {
        this.setState({ mult: e.target.value });
    }

    setOpen(key) {
        this.setState({ open: key });
    }

    render() {
        var tree = Calc.sorted(this.props.items, this.props.recipes, this.props.item, this.state.mult);

        return (
            <div className="card my-2">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="row h4 mb-0">
                            <div className="col-2 form-inline">
                                <a href="#" onClick={this.props.onBack}><img src="/image/svg/octicons/arrow-left.svg" className="pr-1" />Back</a>
                            </div>
                            <div className="col-10 mb-0 form-inline text-center">
                                <label htmlFor="mult" className="pr-1 pl-5">Multiplier: </label>
                                <input className="form-control h4 mb-0" id="mult" value={this.state.mult} size="5" onChange={this.setMult} />
                            </div>
                        </div>
                    </li>
                    {tree.map((subtree, index) => <ItemTree key={index} tree={subtree} index={index} open={this.state.open == index} setOpen={this.setOpen}/>)}
                </ul>
            </div>
        );
    }
}
