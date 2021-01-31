import {Name, Age, Location} from "./demo_layer"
import {DateOfInjury, CauseOfInjury} from "./injury_layer";
import {Concerns} from "./concerns_layer";
import {Navigation} from "./navigation_buttons";
import {ProgressBar} from "./progress_bar";
import {CSSClasses, DefaultErrorMessages, SymbolicConstants} from "./helper_components";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.populateState();

        // Event bindings.
        this.handler = this.onValueChange.bind(this);
        this.checkboxHandler = this.onCheckboxCheck.bind(this);
        this.onValueUpdate =this.onChange.bind(this);
        this.onError = this.onErrorChange.bind(this);
        this.prepareErrors_b = this.prepareErrors.bind(this);
        this.prepareForm_b = this.prepareForm.bind(this);
        this.updateFormAndError_b = this.updateFormAndError.bind(this);
        this.isValidDate_b = this.isValidDate.bind(this);

        // Navigation
        this.changeToNext = this.changeToNextLayer.bind(this);
        this.changeToPrev = this.changeToPrevLayer.bind(this);

        // Common Components
        this.svgArrow = (<svg height="10" width="11"><path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path><path d="M8 4v2H0V4z"></path></svg>);

        // Update local storage periodically.
        setInterval(this.updateStorage, SymbolicConstants.local_storage_update_timout);
    }

    updateStorage = () => {
        window.localStorage.setItem("form", JSON.stringify(this.state));
    }

    populateState() {
        let defaultState = {
            navigation : {
                current_position: 0,
                max_number_of_pages: SymbolicConstants.max_number_of_pages
            },

            form: {
                name: "",
                age: "",
                location: "",
                concerns: [],
                solid_concern: "",
                concerns_other: "",
                injury_date_day: "",
                injury_date_month: "",
                injury_date_year: "",
                injury_reason: ""
            },

            errors: {}
        };

        let state = window.localStorage.getItem("form");
        if (state !== "undefined" && state !== "null" && state != null) {
            state = JSON.parse(state);
            // Don't remember position of page
            state.navigation.current_position = 0;

            return state;
        }
        return defaultState;
    }

    onChange = (field, value) => {
        let items = {...this.state};
        let form = {...this.state.form};
        let errors = {...this.state.errors};
        let navigation = {...this.state.navigation};
        form[field] = value;

        items.errors = errors;
        items.form = form;
        items.navigation = navigation;
        this.setState(items);
    }

    onCheckboxCheck = (field, value) => {
        this.onChange(field, value);
    }

    prepareErrors = (field, value, deleteEnt = false) => {
        let errors = {...this.state.errors};
        let navigation = {...this.state.navigation};
        if (deleteEnt)
            delete errors[field];
        else
            errors[field] = value;

        return errors;
    }

    prepareForm = (field, value) => {
        let form = {...this.state.form};
        form[field] = value;
        return form;
    }

    updateFormAndError = (formObj, errorsObj) => {
        let items = {...this.state};

        items.errors = errorsObj;
        items.form = formObj;

        this.setState(items);
    }

    onValueChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.onChange(field, value);
    }

    onErrorChange = (field, value, deleteEl = false) => {
        let items = {...this.state};
        let form = {...this.state.form}
        let errors = {...this.state.errors};
        let navigation = {...this.state.navigation};
        if (deleteEl)
            delete errors[field];
        else
            errors[field] = value;

        items.errors = errors;
        items.form = form;
        items.navigation = navigation;
        this.setState(items);
    }

    changeToNextLayer = () => {
        if (this.state.navigation.current_position === this.state.navigation.max_number_of_pages)
            return;
        else
            this.state.navigation.current_position++;

        const layers = document.querySelectorAll("." + CSSClasses.form_layer);
        for(let i = 0; i < layers.length; i++) {
            layers[i].style.setProperty("transform",
                `${"translateY(calc("  + this.state.navigation.current_position + "*-" + SymbolicConstants.page_translation_percent + "vh))"}`);
        }
    }

    changeToPrevLayer = () => {
        if (this.state.navigation.current_position === 0)
            return;
        else
            this.state.navigation.current_position--;

        const layers = document.querySelectorAll("." + CSSClasses.form_layer);
        for(let i = 0; i < layers.length; i++) {
            layers[i].style.setProperty("transform",
                `${"translateY("  + (((this.state.navigation.current_position + 1) * -SymbolicConstants.page_translation_percent) 
                    + SymbolicConstants.page_translation_percent) + "vh)"}`);
        }
    }


    // VALIDATION
    isValidDate = (form) => {
        return !(form[CSSClasses.injury_date_month] < SymbolicConstants.month_min || form[CSSClasses.injury_date_month] > SymbolicConstants.month_max)
            && !(form[CSSClasses.injury_date_day] < SymbolicConstants.day_min || form[CSSClasses.injury_date_day] > SymbolicConstants.day_max)
            && !(form[CSSClasses.injury_date_year] < SymbolicConstants.year_min || form[CSSClasses.injury_date_year] > SymbolicConstants.year_max);
    }

    render() {
        return (
            <div className="layers_container">
                <ProgressBar formState={this.state.form} />

                <Name svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                      changeToNext={this.changeToNext} errors={this.state.errors}
                    prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>

                <Age svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                     changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                     prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>

                <Location svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                      changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                      prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>

                <DateOfInjury svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                      changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                      prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}
                      isValidDate={this.isValidDate_b}/>

                <CauseOfInjury svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                    checkboxHandler={this.checkboxHandler} onValueUpdate={this.onValueUpdate}
                   changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                   prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}
                   isValidDate={this.isValidDate_b}/>

                <Concerns svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                    checkboxHandler={this.checkboxHandler} onValueUpdate={this.onValueUpdate}
                    changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}/>

                <Navigation changeToNext={this.changeToNext} changeToPrev={this.changeToPrev}/>
            </div>
        );
    }
}

const domContainer = document.querySelector("#form_container");
ReactDOM.render(<Form/>, domContainer);