import {CSSClasses, ErrorMessage, DefaultErrorMessages, SymbolicConstants, eIndexOf, eIncludes} from "./helper_components";
import {CauseOfInjury} from "./injury_layer";

class Concerns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concerns: {
                1: "Fatigue",                   2: "Headaches",                     3: "Dizziness",
                4: "Walking difficulties",      5: "Hand or arm difficulties",      6: "Sleeping difficulties",
                7: "Thinking difficulties",     8: "Mood difficulties",             9: "Speaking difficulties",
                10: "Depression or anxiety",    11: "Vision problems",              12: "Light or sound sensitivity"
            },

            other_input_disabled: false
        }

        this.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F',
            7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L'
        }

        this.resources = {
            1: "", 2: "/symptoms/headaches", 3: "",  4: "",  5: "", 6: "", 7: "",
            8: "", 9: "",                    10: "", 11: "", 12: ""
        }

        this.prev_layer = CSSClasses.injury_reason;
    }

    displayOtherInput = (element) => {
        if (this.state.other_input_disabled) return;

        let choiceName = element.querySelector("." + CSSClasses.default_choice_name);
        let choiceOtherInput = element.querySelector("." + CSSClasses.choice_other_raw_input);
        let choiceLetter = element.querySelector("." + CSSClasses.choice_letter);
        let checkElement = element.querySelector("." + CSSClasses.enabled_other_input);
        if (!choiceName || !choiceOtherInput || !choiceLetter) return;

        choiceName.classList.toggle(CSSClasses.hidden_element);
        choiceOtherInput.classList.toggle(CSSClasses.hidden_element);
        choiceLetter.classList.toggle(CSSClasses.hidden_element);
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

    isExplanationLink = (e) => {
        let element = e.target;
        if (element.classList.contains(CSSClasses.concern_explanation_link)) return true;
        if (element.parentNode.classList.contains(CSSClasses.concern_explanation_link)) return true;
        if (element.parentNode.parentNode.classList.contains(CSSClasses.concern_explanation_link)) return true;

        return false;
    }

    onCheck = (e) => {
        // Functionality
        if (e.target.classList.contains("solid_choice")) return;
        if (this.isExplanationLink(e)) return;

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
            this.makeSolidChoiceElement(solidChoice);
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

    makeSolidChoiceElement = (element) => {
        if (!element.classList.contains(CSSClasses.solid_choice)) return;
        element.classList.toggle(CSSClasses.solid_choice_is_made);

        // Update state about solid choice.
        if (element.classList.contains(CSSClasses.solid_choice_is_made))
            this.props.checkboxHandler(CSSClasses.solid_concern, element.dataset.solid_value);
        else
            this.props.checkboxHandler(CSSClasses.solid_concern, "");

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
        this.makeSolidChoiceElement(e.target);
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


        let link;

        if (this.resources[key] == "")
            link = (<span className="concern_explanation_link"><img src="/public/images/icons/book.svg" alt=""/></span>)
        else
            link = (<a className="concern_explanation_link" target="_blank" href={this.resources[key]}><img src="/public/images/icons/book.svg" alt=""/></a>);

        return (
            <div key={value + ' ' + key} className={"choice_part " + checked} onClick={this.onCheck} data-value={key}>
                <div className="choice_letter">{this.letters[key]}</div>
                <div className="choice_name">{value}</div>
                <div className="choice_box_interaction">
                    <div onClick={this.makeSolidChoice} data-solid_value={key} className={"solid_choice " + solidChoice}>★</div>
                    {link}
                </div>
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
        if (this.props.formState.solid_concern == "13")
            solidChoice = CSSClasses.solid_choice_is_made;

        return (
            <div className={"choice_part " + checked} data-value="13" onClick={this.onCheck}>
                <div className="choice_letter">M</div>
                <div className="choice_name">
                    <span className="default_choice_name">Other</span>
                    <input onChange={this.handleInput} onKeyUp={this.handleEnter}
                        id="concerns_other" name="concerns_other" className="choice_other_raw_input hidden"
                        defaultValue={valueToDisplay} type="text" placeholder="Type your answer..."/>
                </div>
                <div className="other_input_interaction">
                    <div className="enabled_other_input hidden" onClick={this.unCheck}>✓</div>
                    <div onClick={this.makeSolidChoice} data-solid_value="14" className={"solid_choice " + solidChoice}>★</div>
                </div>
            </div>
        );
    }

    hintOrAction = (field) => {
        if (this.props.errors.hasOwnProperty(field))
            return <ErrorMessage errors={this.props.errors} field={field}/>
    }

    render () {
        // Prepare Checkbox array
        const checkboxItems = [];
        for (let key in this.state.concerns) {
            checkboxItems.push(this.createCheckbox(key));
        }

        const otherInput = this.otherInputRendering();

        let label = (<label className="input_label" htmlFor="injury_date">
            <span className="question_number">  {this.props.svgArrow}</span><span>Check your <strong>greatest concerns.</strong></span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_date">
                <span className="question_number">  {this.props.svgArrow}</span>
                <span>{this.props.formState.name}, check your <strong>greatest concerns.</strong></span></label>);

        const validityElement = this.hintOrAction(CSSClasses.concerns);

        return (
            <section className="concerns form_layer">
                <div className="event_layer concerns_event_layer">
                    <div className="layer_content">
                        <div className="questions concern_questions">
                            {label}
                            <div className="question_usage_hint">
                                Check <strong>up to three</strong> and <strong>star (★)</strong> the most troubling one.
                                For more information about the specific concern press <img className="concern_explanation_link" src="/public/images/icons/book.svg" alt=""/>.
                            </div>
                            <div className="choices_section">
                                {checkboxItems}
                                {otherInput}
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