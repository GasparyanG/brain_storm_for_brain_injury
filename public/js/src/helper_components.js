function RegularButton(props) {
    let disabledButton = "action_box_disabled";
    if (props.isValid)
        disabledButton = "";

    return (
        <div className={"action_box " + disabledButton}>
            <input onClick={props.handleOk} className="raw_button" type="button" value="OK"/>
            <span className="action_prompt">
                <span className="prompt_part pp_press">press</span>
                <span className="prompt_part pp_enter">Enter ↵</span>
            </span>
        </div>
    );
}

function ErrorMessage(props) {
    return (
        <div className="error_message_component">
            <div className="error_message_parts">
                <span className="error_message_icon">
                    <i className="material-icons">warning</i>
                </span>
                    <span className="error_message">
                    {props.errors[props.field].message}
                </span>
            </div>
        </div>
    );
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
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
    form_layer: "form_layer",
    solid_choice: "solid_choice",
    solid_choice_is_made: "solid_choice_is_made",
    better_choice_exists: "better_choice_exists",
    action_box_disabled: "action_box_disabled",
    age_event_layer: "age_event_layer",

    // Form Keys
    name: "name",
    age: "age",
    location: "location",
    concerns: "concerns",
    solid_concern: "solid_concern",
    concerns_other: "concerns_other",
    injury_date_day: "injury_date_day",
    injury_date_month: "injury_date_month",
    injury_date_year: "injury_date_year",
    injury_reason: "injury_reason",

    // Layers
    user_name: "user_name",
    user_age: "user_age",

    // Actions
    warning_shake: "warning_shake"
};

// Symbolic Constants Configuration
const SymbolicConstants = {
    // Timeouts
    page_change_timout: 500,
    local_storage_update_timout: 5000,
    shake_timeout: 1000,

    // External Support
    debounce_wait: 20,
    completed_progress: 100,

    // Events
    enter_key_code: 13,

    // Navigation
    page_translation_percent: 100,
    scroll_delta: -120,
    max_number_of_pages: 5,
    max_number_of_pages_human: 6
}

const DefaultErrorMessages = {
    // NAME
    name: "Name is required",

    // AGE
    age_numbers: "Numbers only",
    age_required: "Age is required"
}

export {
    RegularButton,
    ErrorMessage,
    CSSClasses,
    debounce,
    SymbolicConstants,
    DefaultErrorMessages
};