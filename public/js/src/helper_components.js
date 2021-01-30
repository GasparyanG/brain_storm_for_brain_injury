function RegularButton(props) {
    return (
        <div className="action_box">
            <input onClick={props.handleOk} className="raw_button" type="button" value="OK"/>
            <span className="action_prompt">
                <span className="prompt_part pp_press">press</span>
                <span className="prompt_part pp_enter">Enter ↵</span>
            </span>
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
    concerns_other: "concerns_other",
    injury_reason: "injury_reason",
    form_layer: "form_layer",
    solid_choice: "solid_choice",
    solid_choice_is_made: "solid_choice_is_made"
};

// Symbolic Constants Configuration
const SymbolicConstants = {
    // Timeouts
    page_change_timout: 500,
    local_storage_update_timout: 5000,

    // External Support
    debounce_wait: 20,

    // Events
    enter_key_code: 13,

    // Navigation
    page_translation_percent: 100,
    scroll_delta: -120,
    max_number_of_pages: 5
}

export {RegularButton, CSSClasses, debounce, SymbolicConstants};