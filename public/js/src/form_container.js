import {Name, Age, Location, Email} from "./demo_layer"
import {DateOfInjury, CauseOfInjury} from "./injury_layer";
import {Concerns} from "./concerns_layer";
import {Navigation} from "./navigation_buttons";
import {ProgressBar} from "./progress_bar";
import {
    CSSClasses,
    DefaultErrorMessages,
    SymbolicConstants,
    validateEmail,
    RequestConfigurations
} from "./helper_components";
import {ErrorMessage} from "../form_components/helper_components";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.populateState();

        // Event bindings.
        this.handler                = this.onValueChange.bind(this);
        this.checkboxHandler        = this.onCheckboxCheck.bind(this);
        this.onValueUpdate          = this.onChange.bind(this);
        this.onError                = this.onErrorChange.bind(this);
        this.prepareErrors_b        = this.prepareErrors.bind(this);
        this.prepareForm_b          = this.prepareForm.bind(this);
        this.updateFormAndError_b   = this.updateFormAndError.bind(this);
        this.isValidDate_b          = this.isValidDate.bind(this);
        this.progressComputation_b  = this.progressComputation.bind(this);

        // Send request to server via Ajax.
        this.submit_b = this.submit.bind(this);

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

    storageContentIsValid = (storageData) => {
        if (storageData === "undefined" || storageData == "null" || storageData == null) return false;
        // Required field existence checking.
        let parsedData = JSON.parse(storageData);
        if (!parsedData.hasOwnProperty("navigation")
            || !parsedData.hasOwnProperty("form")
            || !parsedData.hasOwnProperty("errors")) return false;

        return true;    // Valid.
    }

    populateState = () => {
        let defaultState = {
            navigation : {
                current_position: 0,
                max_number_of_pages: SymbolicConstants.max_number_of_pages
            },

            form: {
                name: "",
                age: "",
                email: "",
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
        if (this.storageContentIsValid(state)) {
            state = JSON.parse(state);
            // Don't remember position of page
            state.navigation.current_position = 0;

            return state;
        }

        return defaultState;
    }

    // Handle submit button press.
    submit = () => {
        self = this;
        $.ajax({
            url: RequestConfigurations.form_submit_url,
            method: RequestConfigurations.post,
            data: JSON.stringify(this.state),
            success: function(data) {
                data = JSON.parse(data);
                if (data.success)
                    window.location.replace(RequestConfigurations.thank_you_url);
                else
                    self.setState(data.data);
            },
            error: function(e) {
                console.error(e);
            }
        });
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

    updateNavigation = (field, value) => {
        let items = {...this.state};
        let form = {...this.state.form};
        let errors = {...this.state.errors};
        let navigation = {...this.state.navigation};
        navigation[field] = value;

        items.errors = errors;
        items.form = form;
        items.navigation = navigation;
        this.setState(items);
    }

    changeToNextLayer = () => {
        if (this.state.navigation.current_position === this.state.navigation.max_number_of_pages)
            return;

        let currentPosition = this.state.navigation.current_position + 1;
        this.updateNavigation("current_position", (this.state.navigation.current_position + 1));

        const layers = document.querySelectorAll("." + CSSClasses.form_layer);
        for(let i = 0; i < layers.length; i++) {
            layers[i].style.setProperty("transform",
                `${"translateY(calc("  + currentPosition + "*-" + SymbolicConstants.page_translation_percent + "vh))"}`);
        }
    }

    changeToPrevLayer = () => {
        if (this.state.navigation.current_position === 0)
            return;

        let currentPosition = this.state.navigation.current_position - 1;
        this.updateNavigation("current_position", (this.state.navigation.current_position - 1));

        const layers = document.querySelectorAll("." + CSSClasses.form_layer);
        for(let i = 0; i < layers.length; i++) {
            layers[i].style.setProperty("transform",
                `${"translateY("  + (((currentPosition + 1) * -SymbolicConstants.page_translation_percent) 
                    + SymbolicConstants.page_translation_percent) + "vh)"}`);
        }
    }


    // VALIDATION
    isValidDate = (form) => {
        return !(form[CSSClasses.injury_date_month] < SymbolicConstants.month_min || form[CSSClasses.injury_date_month] > SymbolicConstants.month_max)
            && !(form[CSSClasses.injury_date_day] < SymbolicConstants.day_min || form[CSSClasses.injury_date_day] > SymbolicConstants.day_max)
            && !(form[CSSClasses.injury_date_year] < SymbolicConstants.year_min || form[CSSClasses.injury_date_year] > SymbolicConstants.year_max);
    }

    // PROGRESS COMPUTATION
    stringValues = (field) => {
        return !(this.state.form[field] == "");
    }

    areConcernsValid = () => {
        return !(
            // There is no element in 'concerns' array and 'concerns_other' string is empty.
            ((this.state.form.concerns.length < SymbolicConstants.min_amount_of_choices)
                && (this.state.form.concerns_other.length < SymbolicConstants.min_length_of_other_concern))
            // Concerns have error, but it's not related with more than required amount of choices.
            || (this.state.errors.hasOwnProperty(CSSClasses.concerns)
                && this.state.errors[CSSClasses.concerns].message !== DefaultErrorMessages.more_than_three)
        );
    }

    progressComputation = () => {
        let progress = 0;
        let progressStep =
            Math.ceil(SymbolicConstants.completed_progress/SymbolicConstants.progress_steps);

        // Consider email as required if and only if email field contains some content.
        if (this.state.form.email != "")
            progressStep = Math.ceil(SymbolicConstants.completed_progress/SymbolicConstants.progress_steps_with_email);

        progress += !this.stringValues(CSSClasses.name) ? 0 : progressStep;
        progress += !this.stringValues(CSSClasses.age) ? 0 : progressStep;
        progress += !this.stringValues(CSSClasses.location) ? 0 : progressStep;

        // Consider email as required if and only if email field contains some content.
        if (this.state.form.email != "")
            progress += !validateEmail(this.state.form.email) ? 0 : progressStep;

        progress += !this.stringValues(CSSClasses.injury_reason) ? 0 : progressStep;
        progress += !this.isValidDate(this.state.form) ? 0 : progressStep;
        progress += !this.areConcernsValid() ? 0 : progressStep;
        progress += !this.stringValues(CSSClasses.solid_concern) ? 0: progressStep;

        return progress;
    }

    render() {
        return (
            <div className="layers_container">
                {/*  PROGRESS BAR SECTION */}
                <ProgressBar progressComputation={this.progressComputation_b} errors={this.state.errors}
                     formState={this.state.form} isValidDate={this.isValidDate_b}/>

                {/*  NAME SECTION */}
                <Name svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                      changeToNext={this.changeToNext} errors={this.state.errors}
                    prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>

                {/*  AGE SECTION */}
                <Age svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                     changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                     prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>

                {/*  LOCATION SECTION */}
                <Location svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                      changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                      prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>

                {/*  EMAIL ADDRESS SECTION */}
                <Email svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                  changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                  prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>


                {/*  DATE OF INJURY SECTION */}
                <DateOfInjury svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                      changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                      prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}
                      isValidDate={this.isValidDate_b}/>

                {/*  CAUSE OF INJURY SECTION */}
                <CauseOfInjury svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                    checkboxHandler={this.checkboxHandler} onValueUpdate={this.onValueUpdate}
                   changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                   prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}
                   isValidDate={this.isValidDate_b}/>

                {/*  CONCERNS SECTION */}
                <Concerns svgArrow={this.svgArrow} handler={this.handler} formState={this.state.form}
                    checkboxHandler={this.checkboxHandler} onValueUpdate={this.onValueUpdate}
                    changeToNext={this.changeToNext} changeToPrev={this.changeToPrev} errors={this.state.errors}
                    prepareErrors={this.prepareErrors_b} prepareForm={this.prepareForm_b} updateFormAndError={this.updateFormAndError_b}/>

                {/*  NAVIGATION SECTION  */}
                <Navigation submit={this.submit_b} navigation={this.state.navigation} progressComputation={this.progressComputation_b} changeToNext={this.changeToNext}
                        changeToPrev={this.changeToPrev}/>
            </div>
        );
    }
}

const domContainer = document.querySelector("#form_container");
ReactDOM.render(<Form/>, domContainer);