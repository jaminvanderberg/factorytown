export class DropDown extends React.Component {
    render() {
        var self = this;

        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="category"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                >
                    {this.props.current == null ? <span className="pr-2">{this.props.blank}</span> :
                        <span className="pr-2">
                            <img className="icon-small" src={"image/" + this.props.folder + "/" + this.props.current.image} />
                            <span className="pl-1">{this.props.current.name}</span>
                        </span>
                    }
                </button>
                <div className="dropdown-menu" aria-labelledby="category">
                    <a className="dropdown-item" href="#" onClick={() => this.props.onSelect(null)}>
                        <img className="icon-small" src={"image/blank.png"} />
                        <span className="pl-1">-- No Filter --</span>
                    </a>
                    {this.props.list.map((i) =>
                        <a className="dropdown-item" key={i.id} href="#" onClick={() => this.props.onSelect(i.id, i.name, i.image)}>
                            <img className="icon-small" src={"image/" + self.props.folder + "/" + i.image} />
                            <span className="pl-1">{i.name}</span>
                        </a>
                    )}
                </div>
            </div>
        );
    }
}