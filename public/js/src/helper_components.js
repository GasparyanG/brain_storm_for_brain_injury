function RegularButton(props) {
    return (
        <div className="action_box">
            <input className="raw_button" type="button" value="OK"/>
            <span className="action_prompt">
                <span className="prompt_part pp_press">press</span>
                <span className="prompt_part pp_enter">Enter ↵</span>
            </span>
        </div>
    );
}

// Configuration
const CSSClasses = {
    choice_is_made: "choice_is_made",
    choice_other_raw_input: "choice_other_raw_input",
    choice_name: "choice_name",
    default_choice_name: "default_choice_name",
    hidden_element: "hidden",
    choice_letter: "choice_letter",
    enabled_other_input: "enabled_other_input",
    concerns_other: "concerns_other",
    injury_reason: "injury_reason"
};

export {RegularButton, CSSClasses};