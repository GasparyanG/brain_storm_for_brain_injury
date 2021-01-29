import {CSSClasses, RegularButton} from "./helper_components";

class DateOfInjury extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let label = (<label className="input_label" htmlFor="injury_date">
            <span className="question_number">4 {this.props.svgArrow}</span><strong>When was</strong> your brain injury?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_date">
                <span className="question_number">4 {this.props.svgArrow}</span>{this.props.formState.name}, <strong>when was</strong> your brain injury??</label>);


        return (
            <section className="date_of_injury form_layer hidden">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <div className="date_input_section">
                            <div className="date_input_part date_input_part_dash date_input_month">
                                <label htmlFor="injury_date_month" className="date_section_name">Month</label>
                                <input onChange={this.props.handler} id="injury_date_month" name="injury_date_month" className="raw_date_input" type="text"/>
                            </div>
                            <div className="date_input_part date_input_part_dash date_input_day">
                                <label htmlFor="injury_date_day" className="date_section_name">Day</label>
                                <input onChange={this.props.handler} id="injury_date_day" name="injury_date_day" className="raw_date_input" type="text"/>
                            </div>
                            <div className="date_input_part date_input_year">
                                <label htmlFor="injury_date_year" className="date_section_name">Year</label>
                                <input onChange={this.props.handler} id="injury_date_year" name="injury_date_year" className="raw_date_input" type="text"/>
                            </div>
                        </div>
                        <RegularButton/>
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

        this.props.checkboxHandler("injury_reason", element.dataset.value);

        // Design
        element.classList.toggle(CSSClasses.choice_is_made);
    }

    createCheckbox(key) {
        let value = this.state.concerns[key];
        let checked = "";
        if (this.props.formState.injury_reason === key)
            checked = CSSClasses.choice_is_made;

        return (
            <div key={value + ' ' + key} className={"choice_part " + checked} onClick={this.onCheck} data-value={key}>
                <div className="choice_letter">{this.letters[key]}</div>
                <div className="choice_name">{value}</div>
            </div>
        );
    }

    unCheck = (e) => {
        if (!e.target.classList.contains(CSSClasses.enabled_other_input)) return;

        // Remove from choices
        this.props.onValueUpdate(CSSClasses.injury_reason, "");

        // Remove decoration
        let parentElement = e.target.parentNode.classList.remove(CSSClasses.choice_is_made);

        this.state.other_input_disabled = false;
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
                <div className="choice_letter">N</div>
                <div className="choice_name">
                    <span className="default_choice_name">Other</span>
                    <input onChange={this.props.handler} id="injury_reason" name="injury_reason" className="choice_other_raw_input hidden" defaultValue={valueToDisplay} type="text" placeholder="Type your answer..."/>
                </div>
                <div className="enabled_other_input hidden" onClick={this.unCheck}>✓</div>
            </div>
        );
    }

    render () {
        let label = (<label className="input_label" htmlFor="injury_reason">
            <span className="question_number">5 {this.props.svgArrow}</span>What was <strong>the cause</strong> of injury?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_reason">
                <span className="question_number">5 {this.props.svgArrow}</span>{this.props.formState.name}, what was <strong>the cause</strong> of injury?</label>);

        let checkboxItems = [];
        for (let key in this.state.concerns) {
            checkboxItems.push(this.createCheckbox(key));
        }

        const otherInput = this.otherInputRendering();

        return (
            <section className="cause_of_injury form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <div className="choices_section">
                            {checkboxItems}
                            {otherInput}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export {DateOfInjury, CauseOfInjury};