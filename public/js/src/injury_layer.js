import {CSSClasses, ErrorMessage, RegularButton, SymbolicConstants, DefaultErrorMessages} from "./helper_components";

class DateOfInjury extends React.Component {
    constructor(props) {
        super(props);

        this.prev_layer = CSSClasses.email;
    }

    handleOk = () => {
        // Dispatch.
        if (this.props.errors.hasOwnProperty(CSSClasses.date)) return;

        if (this.props.errors.hasOwnProperty(this.prev_layer)) {
            this.props.changeToPrev();
        } else
            this.props.changeToNext();
    }

    numbersOnly = (e) => {
        let errors = this.props.prepareErrors(CSSClasses.date, {message : DefaultErrorMessages.numbers_only});
        this.props.updateFormAndError(this.props.formState, errors);

        let layer = document.querySelector("." + CSSClasses.doi_event_layer);
        layer.classList.add(CSSClasses.warning_shake);

        setTimeout(() => {layer.classList.remove(CSSClasses.warning_shake)}, SymbolicConstants.shake_timeout)
    }

    handleInput = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = '';
            return this.numbersOnly(e);
        }

        let errors = this.props.errors;
        let form = this.props.prepareForm(e.target.name, e.target.value);

        if (e.target.value == "")
            errors = this.props.prepareErrors(CSSClasses.date, {message: DefaultErrorMessages.date_required});
        else if (e.target.classList.contains(CSSClasses.date_month)) {
            // Validate month
            if (e.target.value < SymbolicConstants.month_min || e.target.value > SymbolicConstants.month_max)
                errors = this.props.prepareErrors(CSSClasses.date, {message: DefaultErrorMessages.date_wrong});
        } else if (e.target.classList.contains(CSSClasses.date_day)) {
            //Validate day
            if (e.target.value < SymbolicConstants.day_min || e.target.value > SymbolicConstants.day_max)
                errors = this.props.prepareErrors(CSSClasses.date, {message: DefaultErrorMessages.date_wrong});
        } else if (e.target.classList.contains(CSSClasses.date_year)) {
            // Validate year
            if (e.target.value < SymbolicConstants.year_min || e.target.value > SymbolicConstants.year_max)
                errors = this.props.prepareErrors(CSSClasses.date, {message: DefaultErrorMessages.date_wrong});
        }

        if (this.props.isValidDate(form))
            errors = this.props.prepareErrors(CSSClasses.date, false, true);

        this.props.updateFormAndError(form, errors);
    }

    handleEnter = (e) => {
        // Call to handleOk when it's the last input.
        if (e.keyCode === SymbolicConstants.enter_key_code) {
            if (e.target.classList.contains("date_month")) {
                // Validate month
                this.handleInput(e);
                let dayInput = document.querySelector(".date_day");
                dayInput.focus();
            } else if (e.target.classList.contains("date_day")) {
                //Validate day
                this.handleInput(e);
                let yearInput = document.querySelector(".date_year");
                yearInput.focus();
            } else if (e.target.classList.contains("date_year")) {
                // Validate year
                this.handleInput(e);
                this.handleOk();
            }
        }
    }

    validateInput = () => {
        return !(
            this.props.formState.injury_date_day == ""
            || this.props.formState.injury_date_month == ""
            || this.props.formState.injury_date_year == ""
        );
    }

    hintOrAction = (field) => {
        let isValid = this.validateInput();
        if (this.props.errors.hasOwnProperty(field))
            return <ErrorMessage errors={this.props.errors} field={field}/>

        return (
            <RegularButton errors={this.props.errors} isValid={isValid} formState={this.props.formState} handleOk={this.handleOk}/>
        );
    }

    render () {
        let label = (<label className="input_label" htmlFor="injury_date">
            <span className="question_number">  {this.props.svgArrow}</span><span><strong>When was</strong> your brain injury?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_date">
                <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, <strong>when was</strong> your brain injury?</span></label>);

        let validityElement = this.hintOrAction(CSSClasses.date);

        return (
            <section className="date_of_injury form_layer">
                <div className="event_layer doi_event_layer">
                    <div className="layer_content">
                        <div className="questions">
                            {label}
                            <div className="date_input_section">
                                <div className="date_input_part date_input_part_dash date_input_month">
                                    <label htmlFor="injury_date_month" className="date_section_name">Month</label>
                                    <input onChange={this.handleInput} onKeyUp={this.handleEnter} defaultValue={this.props.formState.injury_date_month}
                                           id="injury_date_month" name="injury_date_month" className="raw_date_input date_month" type="text"/>
                                </div>
                                <div className="date_input_part date_input_part_dash date_input_day">
                                    <label htmlFor="injury_date_day" className="date_section_name">Day</label>
                                    <input onChange={this.handleInput} onKeyUp={this.handleEnter} defaultValue={this.props.formState.injury_date_day}
                                           id="injury_date_day" name="injury_date_day" className="raw_date_input date_day" type="text"/>
                                </div>
                                <div className="date_input_part date_input_year">
                                    <label htmlFor="injury_date_year" className="date_section_name">Year</label>
                                    <input onChange={this.handleInput} onKeyUp={this.handleEnter} defaultValue={this.props.formState.injury_date_year}
                                           id="injury_date_year" name="injury_date_year" className="raw_date_input date_year" type="text"/>
                                </div>
                            </div>
                            {validityElement}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class CauseOfInjury extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concerns: {
                1: "Traumatic brain injury",    2: "Stroke",    3: "Cerebral palsy",
                4: "Tumor",                     5: "Infection"
            },

            other_input_disabled: false
        }

        this.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F'
        }
    }

    displayOtherInput = (element) => {
        if (this.state.other_input_disabled) return;

        let choiceName = element.querySelector("." + CSSClasses.default_choice_name);
        let choiceOtherInput = element.querySelector("." + CSSClasses.choice_other_raw_input);
        // let choiceLetter = element.querySelector("." + CSSClasses.choice_letter);
        let checkElement = element.querySelector("." + CSSClasses.enabled_other_input);
        if (!choiceName || !choiceOtherInput /*|| !choiceLetter*/) return;

        choiceName.classList.toggle(CSSClasses.hidden_element);
        choiceOtherInput.classList.toggle(CSSClasses.hidden_element);
        // choiceLetter.classList.toggle(CSSClasses.hidden_element);
        checkElement.classList.toggle(CSSClasses.hidden_element);

        this.state.other_input_disabled = !checkElement.classList.contains(CSSClasses.hidden_element);
    }

    onCheck = (e) => {
        // Functionality
        let element;
        if (e.target.hasAttribute("data-value"))
            element = e.target;
        else if (e.target.parentNode.hasAttribute("data-value"))
            element = e.target.parentNode;
        else if (e.target.parentNode.parentNode.hasAttribute("data-value"))
            element = e.target.parentNode.parentNode;

        if (element.querySelector("." + CSSClasses.choice_other_raw_input)) {
            return this.displayOtherInput(element);
        }

        // Design
        element.classList.toggle(CSSClasses.choice_is_made);

        if (element.classList.contains(CSSClasses.choice_is_made)) {
            let form = this.props.prepareForm(CSSClasses.injury_reason, element.dataset.value);
            let errors = this.props.prepareErrors(CSSClasses.injury_reason, false, true);

            this.props.updateFormAndError(form, errors);

            // After single choice change page.
            setTimeout(this.handleOk, SymbolicConstants.page_change_timout);
        } else {
            let form = this.props.prepareForm(CSSClasses.injury_reason, "");
            let errors = this.props.prepareErrors(CSSClasses.injury_reason, {message: DefaultErrorMessages.injury_reason_required});

            this.props.updateFormAndError(form, errors);
        }
    }

    createCheckbox(key) {
        let value = this.state.concerns[key];
        let checked = "";
        if (this.props.formState.injury_reason === key)
            checked = CSSClasses.choice_is_made;

        return (
            <div key={value + ' ' + key} className={"choice_part " + checked} onClick={this.onCheck} data-value={key}>
                {/*<div className="choice_letter">{this.letters[key]}</div>*/}
                <div className="choice_name">{value}</div>
            </div>
        );
    }

    unCheck = (e) => {
        if (!e.target.classList.contains(CSSClasses.enabled_other_input)) return;

        // Remove from choices
        let form = this.props.prepareForm(CSSClasses.injury_reason, "");
        let errors = this.props.prepareErrors(CSSClasses.injury_reason, {message: DefaultErrorMessages.injury_reason_required});

        this.props.updateFormAndError(form, errors);

        // Remove decoration
        let parentElement = e.target.parentNode.classList.remove(CSSClasses.choice_is_made);

        this.state.other_input_disabled = false;
    }

    handleOk = () => {
        // Validation goes here.

        if (this.props.errors.hasOwnProperty(CSSClasses.injury_reason))
            return;

        if (!this.props.isValidDate(this.props.formState))
            this.props.changeToPrev();
        else
            this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)
            this.handleOk();
    }

    handleInput = (e) => {
        let errors;
        let form = this.props.prepareForm(e.target.name, e.target.value);

        if (e.target.value !== "") {
            errors = this.props.prepareErrors(CSSClasses.injury_reason, false, true);
        } else
            errors = this.props.prepareErrors(CSSClasses.injury_reason, {message: DefaultErrorMessages.injury_reason_required});

        this.props.updateFormAndError(form, errors);
    }

    otherInputRendering = () => {
        let valueToDisplay = "";
        let checked = "";
        if (this.props.formState.injury_reason !== "" && this.props.formState.injury_reason.length > 1) {
            valueToDisplay = this.props.formState.injury_reason;
            checked = CSSClasses.choice_is_made;
        }

        return (
            <div className={"choice_part " + checked} data-value="6" onClick={this.onCheck}>
                {/*<div className="choice_letter">F</div>*/}
                <div className="choice_name">
                    <span className="default_choice_name">Other</span>
                    <input onChange={this.handleInput} onKeyUp={this.handleEnter} id="injury_reason" name="injury_reason" className="choice_other_raw_input hidden" defaultValue={valueToDisplay} type="text" placeholder="Type your answer..."/>
                </div>
                <div className="enabled_other_input hidden" onClick={this.unCheck}>✓</div>
            </div>
        );
    }

    hintOrAction = (field) => {
        if (this.props.errors.hasOwnProperty(field))
            return <ErrorMessage errors={this.props.errors} field={field}/>
    }

    render () {
        let label = (<label className="input_label" htmlFor="injury_reason">
            <span className="question_number">  {this.props.svgArrow}</span><span>What was <strong>the cause</strong> of injury?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_reason">
                <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, what was <strong>the cause</strong> of injury?</span></label>);

        let checkboxItems = [];
        let checkboxItemsSecondColumn = [];
        for (let key in this.state.concerns) {
            if (key <= 3)
                checkboxItems.push(this.createCheckbox(key));
            else
                checkboxItemsSecondColumn.push(this.createCheckbox(key));
        }

        const otherInput = this.otherInputRendering();
        const validityElement = this.hintOrAction(CSSClasses.injury_reason);

        return (
            <section className="cause_of_injury form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <div className="choices_section">
                            <div className="checkbox_column">
                                {checkboxItems}
                            </div>
                            <div className="checkbox_column">
                                {checkboxItemsSecondColumn}
                                {otherInput}
                            </div>
                        </div>
                        {validityElement}
                    </div>
                </div>
            </section>
        )
    }
}

export {DateOfInjury, CauseOfInjury};