import {Name, Age, Location} from "./demo_layer"
import {DateOfInjury, CauseOfInjury} from "./injury_layer";
import {Concerns} from "./concerns_layer";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.populateState();
        this.handler = this.onValueChange.bind(this);
        this.checkboxHandler = this.onCheckboxCheck.bind(this);

        // Common Components
        this.svgArrow = (<svg height="10" width="11"><path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path><path d="M8 4v2H0V4z"></path></svg>);

        // Update local storage periodically.
        setInterval(this.updateStorage, 5000);
    }

    updateStorage = () => {
        window.localStorage.setItem("form", JSON.stringify(this.state));
    }

    populateState() {
        let defaultState = {
            form: {
                name: "",
                date_of_birth: "",
                location: "",
                concerns: [],
                concerns_other: "",
                injury_date: "",
                injury_reason: ""
            }
        };

        let state = window.localStorage.getItem("form");
        if (state !== "undefined" && state !== "null")
            return JSON.parse(state);
        return defaultState;
    }

    onCheckboxCheck = (field, value) => {
        this.onChange(field, value);
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
        return (
            <div className="layers_container">
                <Name svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}/>
                <Age svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}/>
                <Location svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}/>
            </div>
        );
    }
}

const domContainer = document.querySelector("#form_container");
ReactDOM.render(<Form/>, domContainer);