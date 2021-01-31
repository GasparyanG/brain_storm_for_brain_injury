function RegularButton(props) {
    var disabledButton = "action_box_disabled";
    if (props.isValid) disabledButton = "";

    return React.createElement(
        "div",
        { className: "action_box " + disabledButton },
        React.createElement("input", { onClick: props.handleOk, className: "raw_button", type: "button", value: "OK" }),
        React.createElement(
            "span",
            { className: "action_prompt" },
            React.createElement(
                "span",
                { className: "prompt_part pp_press" },
                "press"
            ),
            React.createElement(
                "span",
                { className: "prompt_part pp_enter" },
                "Enter \u21B5"
            )
        )
    );
}

function ErrorMessage(props) {
    return React.createElement(
        "div",
        { className: "error_message_component" },
        React.createElement(
            "div",
            { className: "error_message_parts" },
            React.createElement(
                "span",
                { className: "error_message_icon" },
                React.createElement(
                    "i",
                    { className: "material-icons" },
                    "warning"
                )
            ),
            React.createElement(
                "span",
                { className: "error_message" },
                props.errors[props.field].message
            )
        )
    );
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function later() {
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
var CSSClasses = {
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
    doi_event_layer: "doi_event_layer", // doi - date of injury

    // Dates
    date_month: "date_month",
    date_day: "date_day",
    date_year: "date_year",

    // Form Keys
    name: "name",
    age: "age",
    location: "location",
    concerns: "concerns",
    solid_concern: "solid_concern",
    concerns_other: "concerns_other",
    injury_reason: "injury_reason",

    date: "date", // Date in general.
    injury_date_day: "injury_date_day",
    injury_date_month: "injury_date_month",
    injury_date_year: "injury_date_year",

    // Layers
    user_name: "user_name",
    user_age: "user_age",

    // Actions
    warning_shake: "warning_shake"
};

// Symbolic Constants Configuration
var SymbolicConstants = {
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
    max_number_of_pages_human: 6,

    // Dates
    day_min: 1,
    day_max: 31, // Consider: leap year, different months.
    month_max: 12,
    month_min: 1,
    year_max: 2021, // Update every year or take dynamically.
    year_min: 1920 // For 100 years old people.
};

var DefaultErrorMessages = {
    // General
    numbers_only: "Numbers only",

    // NAME
    name: "Name is required",

    // AGE
    age_required: "Age is required",

    // Location
    location_required: "Location is required",

    // Date and time
    date_wrong: "Date is wrong", // General
    fill_date_entirely: "Fill date entirely",
    day_wrong: "Day is wrong",
    month_wrong: "Month is wrong",
    year_wrong: "Year is wrong",
    date_required: "Date is required"
};

export { RegularButton, ErrorMessage, CSSClasses, debounce, SymbolicConstants, DefaultErrorMessages };