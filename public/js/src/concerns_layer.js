import {CSSClasses, ErrorMessage, DefaultErrorMessages, SymbolicConstants, eIndexOf, eIncludes} from "./helper_components";
import {CauseOfInjury} from "./injury_layer";

class Concerns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concerns: {
                1: "Fatigue",                   2: "Headaches",
                3: "Walking difficulties",      4: "Hand or arm difficulties",      5: "Sleeping difficulties",
                6: "Thinking difficulties",     7: "Emotional difficulties",        8: "Speaking difficulties",
                9: "Vision problems"
            },

            other_input_disabled: false
        }

        this.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F',
            7: 'G', 8: 'H', 9: 'I'
        }

        this.prev_layer = CSSClasses.injury_reason;
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

    // ERRORS HANDLING
    handleMoreThanRequiredChoices = (element) => {
        let errors = this.props.errors;
        let form = this.props.formState;
        let concerns = [...this.props.formState.concerns];

        // More (or equal) than three element in 'concerns' array.
        if (!eIncludes(concerns, element.dataset.value) && (concerns.length >= SymbolicConstants.max_amount_of_choices))
            errors = this.props.prepareErrors(CSSClasses.concerns, {message: DefaultErrorMessages.more_than_three});
        // 2 elements in 'concerns' array and 'other_concern'.
        else if (!eIncludes(concerns, element.dataset.value)
            && (concerns.length === SymbolicConstants.max_amount_with_other_choice)
            && (form[CSSClasses.concerns_other].length > 0))
            errors = this.props.prepareErrors(CSSClasses.concerns, {message: DefaultErrorMessages.more_than_three});
        else
            errors = this.props.prepareErrors(CSSClasses.concerns, false, true);

        return errors;
    }

    handleChoiceAbsence = (concerns, errors) => {
        if ((concerns.length < SymbolicConstants.min_amount_of_choices)
            && (this.props.formState.concerns_other.length < SymbolicConstants.min_length_of_other_concern))
            errors = this.props.prepareErrors(CSSClasses.concerns, {message: DefaultErrorMessages.concerns_required});
        return errors;
    }

    animateShake = () => {
        let layer = document.querySelector("." + CSSClasses.concerns_event_layer);
        layer.classList.add(CSSClasses.warning_shake);

        setTimeout(() => {layer.classList.remove(CSSClasses.warning_shake)}, SymbolicConstants.shake_timeout)
    }

    onCheck = (e) => {
        // Functionality
        if (e.target.classList.contains("solid_choice")) return;

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

        // Don't let to make more than required choices
        let errors;
        if ((errors = this.handleMoreThanRequiredChoices(element)).hasOwnProperty(CSSClasses.concerns)) {
            this.props.updateFormAndError(this.props.formState, errors);
            this.animateShake();
            return;
        }

        let concerns = [...this.props.formState.concerns];
        if (eIncludes(concerns, element.dataset.value)) {
            let index = eIndexOf(concerns, element.dataset.value);
            if (index > -1) {
                concerns.splice(index, 1);
            }
        } else {
            concerns.push(element.dataset.value);
        }

        // Choice is required checking.
        errors = this.handleChoiceAbsence(concerns, errors);
        let form = this.props.prepareForm(CSSClasses.concerns, concerns);

        this.props.updateFormAndError(form, errors);

        // Design
        element.classList.toggle(CSSClasses.choice_is_made);
        let solidChoice = element.querySelector("." + CSSClasses.solid_choice);
        if (solidChoice.classList.contains(CSSClasses.solid_choice_is_made)) {
            this.makeSolidChoiceElement(solidChoice, concerns, true);
        }
    }

    isSolidChoice = (checkedElement) => {
        return this.props.formState.solid_concern == checkedElement.dataset.value;
    }

    displaySolidChoice = (checkedElement) => {
        if (this.isSolidChoice(checkedElement)) return;
        let starEl = checkedElement.querySelector("." + CSSClasses.solid_choice);
        starEl.classList.remove(CSSClasses.hidden_element);
    }

    hideSolidChoice = (checkedElement) => {
        if (this.isSolidChoice(checkedElement)) return;
        let starEl = checkedElement.querySelector("." + CSSClasses.solid_choice);
        starEl.classList.add(CSSClasses.hidden_element);
    }

    updateConcerns = (form, concerns) => {
        form[CSSClasses.concerns] = concerns;
        return form;
    }

    makeSolidChoiceElement = (element, concerns, withConcerns = false) => {
        if (!element.classList.contains(CSSClasses.solid_choice)) return;
        element.classList.toggle(CSSClasses.solid_choice_is_made);

        let form;
        let errors;

        // Update state about solid choice.
        if (element.classList.contains(CSSClasses.solid_choice_is_made)) {
            errors = this.props.prepareErrors(CSSClasses.solid_concern, false, true); // Remove error.
            form = this.props.prepareForm(CSSClasses.solid_concern, element.dataset.solid_value);
        } else {
            errors = this.props.prepareErrors(CSSClasses.solid_concern,
                {message: DefaultErrorMessages.solid_concern_required}); // Add error.
            form = this.props.prepareForm(CSSClasses.solid_concern, "");
        }

        if (withConcerns)
            this.updateConcerns(form, concerns);

        this.props.updateFormAndError(form, errors);

        // Update solid choice button for other elements.
        let choices = document.querySelectorAll(".concerns ." + CSSClasses.choice_is_made);
        for (let i = 0; i < choices.length; i++) {
            if (this.props.formState.solid_concern === "")
                this.displaySolidChoice(choices[i]);
            else
                this.hideSolidChoice(choices[i]);
        }
    }

    makeSolidChoice = (e) => {
        this.makeSolidChoiceElement(e.target, false, false);
    }

    createCheckbox = (key) => {
        let value = this.state.concerns[key];
        let checked = "";
        if (eIncludes(this.props.formState.concerns, key))
            checked = CSSClasses.choice_is_made;

        let solidChoice = "";
        if (this.props.formState.solid_concern == key)
            solidChoice = CSSClasses.solid_choice_is_made;

        solidChoice = solidChoice === "" && this.props.formState.solid_concern !== ""
            ? solidChoice + " hidden": solidChoice;

        return (
            <div key={value + ' ' + key} className={"choice_part " + checked} onClick={this.onCheck} data-value={key}>
                {/*<div className="choice_letter">{this.letters[key]}</div>*/}
                <div className="choice_name">{value}</div>
                <div onClick={this.makeSolidChoice} data-solid_value={key} className={"solid_choice " + solidChoice}>★</div>
            </div>
        );
    }

    unCheck = (e) => {
        if (!e.target.classList.contains(CSSClasses.enabled_other_input)) return;

        // Remove from choices
        this.props.onValueUpdate(CSSClasses.concerns_other, "");

        // Remove decoration
        e.target.parentNode.classList.remove(CSSClasses.choice_is_made);
        let starElement = e.target.parentNode.parentElement.querySelector("." + CSSClasses.solid_choice);
        starElement.classList.remove(CSSClasses.solid_choice_is_made);

        this.state.other_input_disabled = false;
    }

    handleOk = () => {
        // Validation goes here.

        if (this.props.formState[this.prev_layer] == "")
            this.props.changeToPrev();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)       // Enter is pressed.
            this.handleOk();
    }

    handleInput = (e) => {
        let errors = this.props.errors;
        let form = this.props.formState;
        if (this.props.formState.concerns.length >= SymbolicConstants.max_amount_of_choices) {
            e.target.value = '';
            this.animateShake();
            errors = this.props.prepareErrors(CSSClasses.concerns, {message: DefaultErrorMessages.cant_type});
        } else {
            errors = this.props.prepareErrors(CSSClasses.concerns, false, true);
            form = this.props.prepareForm(CSSClasses.concerns_other, e.target.value);
        }

        this.props.updateFormAndError(form, errors);
    }

    otherInputRendering = () => {
        let valueToDisplay = "";
        let checked = "";
        if (this.props.formState.concerns_other !== "") {
            valueToDisplay = this.props.formState.concerns_other;
            checked = CSSClasses.choice_is_made;
        }

        let solidChoice = "";
        if (this.props.formState.solid_concern == SymbolicConstants.other_concern_number)
            solidChoice = CSSClasses.solid_choice_is_made;

        solidChoice = solidChoice === "" && this.props.formState.solid_concern !== ""
            ? solidChoice + " hidden": solidChoice;

        return (
            <div className={"choice_part " + checked} data-value={SymbolicConstants.other_concern_number} onClick={this.onCheck}>
                {/*<div className="choice_letter">J</div>*/}
                <div className="choice_name">
                    <span className="default_choice_name">Other</span>
                    <input onChange={this.handleInput} onKeyUp={this.handleEnter}
                        id="concerns_other" name="concerns_other" className="choice_other_raw_input hidden"
                        defaultValue={valueToDisplay} type="text" placeholder="Type your answer..."/>
                </div>
                <div className="other_input_interaction">
                    <div className="enabled_other_input hidden" onClick={this.unCheck}>✓</div>
                    <div onClick={this.makeSolidChoice} data-solid_value={SymbolicConstants.other_concern_number}
                         className={"solid_choice " + solidChoice}>★</div>
                </div>
            </div>
        );
    }

    hintOrAction = () => {
        if (this.props.errors.hasOwnProperty(CSSClasses.concerns))
            return (<ErrorMessage errors={this.props.errors} field={CSSClasses.concerns}/>)
        else if (this.props.errors.hasOwnProperty(CSSClasses.solid_concern))
            return (<ErrorMessage errors={this.props.errors} field={CSSClasses.solid_concern}/>);
    }

    render () {
        // Prepare Checkbox array
        const checkboxItems = [];
        const checkboxItemsSecondColumn = [];
        for (let key in this.state.concerns) {
            if (key <= SymbolicConstants.max_items_per_column)
                checkboxItems.push(this.createCheckbox(key));
            else
                checkboxItemsSecondColumn.push(this.createCheckbox(key));
        }

        const otherInput = this.otherInputRendering();

        let label = (<label className="input_label" htmlFor="injury_date">
            <span className="question_number">  {this.props.svgArrow}</span><span>Check your <strong>greatest concerns.</strong></span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_date">
                <span className="question_number">  {this.props.svgArrow}</span>
                <span>{this.props.formState.name}, check your <strong>greatest concerns.</strong></span></label>);

        const validityElement = this.hintOrAction();

        return (
            <section className="concerns form_layer">
                <div className="event_layer concerns_event_layer">
                    <div className="layer_content">
                        <div className="questions concern_questions">
                            {label}
                            <div className="question_usage_hint">
                                Check <strong>up to three</strong> and <strong>star (★)</strong> the most troubling one.
                            </div>
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
                </div>
            </section>
        );
    }
}

export {Concerns};