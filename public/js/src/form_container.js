import {DemographicLayer} from "./demo_layer"
import {InjuryIdentifier} from "./injury_layer";
import {Concerns} from "./concerns_layer";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.populateState();
        this.handler = this.onValueChange.bind(this);

        // Update local storage periodically.
        setInterval(this.updateStorage, 30000);
    }

    updateStorage = () => {
        window.localStorage.setItem("form", JSON.stringify(this.state));
    }

    populateState() {
        let defaultState = {
            liked: false,
            form: {
                name: "",
                age: "",
                location: ""
            }
        };

        let state = window.localStorage.getItem("form");
        if (state !== "undefined" && state !== "null")
            return JSON.parse(state);
        return defaultState;
    }

    handleClick = () => {
        this.setState(this.state = {
            liked: true
        });
    }

    onValueChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.onChange(field, value);
    }

    onChange = (field, value) => {
        let items = {...this.state};
        let form = {...this.state.form};
        form[field] = value;

        items.form = form;
        this.setState(items);
    }

    render() {
        if (this.state.liked) {
            return (
                <div>
                    <DemographicLayer handler={this.handler} formState={this.state.form}/>
                    <InjuryIdentifier handler={this.handler} formState={this.state.form}/>
                    <Concerns handler={this.handler}  formState={this.state.form}/>
                </div>
            );
        }

        return (
            <button onClick={this.handleClick}>
                Like
            </button>
        );
    }
}

const domContainer = document.querySelector("#form_container");
ReactDOM.render(<Form/>, domContainer);