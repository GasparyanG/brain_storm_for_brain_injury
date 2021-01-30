import {CSSClasses} from "./helper_components";
import {CauseOfInjury} from "./injury_layer";

class Concerns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concerns: {
                1: "Headaches",                 2: "Pain",                                      3: "Fatigue",
                4: "Balance difficulties",      5: "Dizziness",                                 6: "Vision problems",
                7: "Hearing problems",          8: "Light or sound sensitivity",                9: "Trouble sleeping",
                10: "Thinking difficulties",    11: "Speaking or understanding difficulties",   12: "Mood difficulties",
                13: "Depression or anxiety"
            },

            other_input_disabled: false
        }

        this.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F',
            7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L', 13: 'M'
        }
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

        // Don't let to make more than 4 choices
        // Coming soon!

        let concerns = [...this.props.formState.concerns];
        if (concerns.includes(element.dataset.value)) {
            let index = concerns.indexOf(element.dataset.value);
            if (index > -1) {
                concerns.splice(index, 1);
            }
        } else {
            concerns.push(element.dataset.value);
        }

        this.props.checkboxHandler("concerns", concerns);

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

    createCheckbox(key) {
        let value = this.state.concerns[key];
        let checked = "";
        if (this.props.formState.concerns.includes(key))
            checked = CSSClasses.choice_is_made;

        let solidChoice = "";
        if (this.props.formState.solid_concern == key)
            solidChoice = CSSClasses.solid_choice_is_made;

        solidChoice = solidChoice === "" && this.props.formState.solid_concern !== ""
            ? solidChoice + " hidden": solidChoice;

        return (
            <div key={value + ' ' + key} className={"choice_part " + checked} onClick={this.onCheck} data-value={key}>
                <div className="choice_letter">{this.letters[key]}</div>
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

        this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)       // Enter is pressed.
            this.handleOk();
    }

    otherInputRendering = () => {
        let valueToDisplay = "";
        let checked = "";
        if (this.props.formState.concerns_other !== "") {
            valueToDisplay = this.props.formState.concerns_other;
            checked = CSSClasses.choice_is_made;
        }

        let solidChoice = "";
        if (this.props.formState.solid_concern == "14")
            solidChoice = CSSClasses.solid_choice_is_made;

        return (
            <div className={"choice_part " + checked} data-value="14" onClick={this.onCheck}>
                <div className="choice_letter">N</div>
                <div className="choice_name">
                    <span className="default_choice_name">Other</span>
                    <input onChange={this.props.handler} onKeyUp={this.handleEnter}
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

    render () {
        // Prepare Checkbox array
        const checkboxItems = [];
        for (let key in this.state.concerns) {
            checkboxItems.push(this.createCheckbox(key));
        }

        const otherInput = this.otherInputRendering();

        let label = (<label className="input_label" htmlFor="injury_date">
            <span className="question_number">6 {this.props.svgArrow}</span><span>Check your <strong>greatest concerns.</strong></span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_date">
                <span className="question_number">6 {this.props.svgArrow}</span>
                <span>{this.props.formState.name}, check your <strong>greatest concerns.</strong></span></label>);

        return (
            <section className="concerns form_layer">
                <div className="layer_content">
                    <div className="questions concern_questions">
                        {label}
                        <div className="question_usage_hint">
                            Check <strong>up to four</strong> and <strong>star</strong> the most troubling one.
                        </div>
                        <div className="choices_section">
                            {checkboxItems}
                            {otherInput}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export {Concerns};