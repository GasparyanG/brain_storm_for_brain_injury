function SubmitButton(props) {
    var disabled = "submit_button_disabled";
    if (props.progress) {
        disabled = "nav_submit_button";
    }

    return React.createElement(
        "div",
        { onClick: props.submit, className: "nav_btn " + disabled },
        "submit \u2713"
    );
}

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
                "\u26A0"
            ),
            React.createElement(
                "span",
                { className: "error_message" },
                props.errors[props.field].message
            )
        )
    );
}

function isBrowser(browser_name) {
    // Opera 8.0+
    var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    }(!window['safari'] || typeof safari !== 'undefined' && window['safari'].pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    var objectOfBrowsers = {
        is_opera: isOpera,
        is_firefox: isFirefox,
        is_safari: isSafari,
        is_ie: isIE,
        is_edge: isEdge,
        is_chrome: isChrome,
        is_edge_chromium: isEdgeChromium,
        is_blink: isBlink
    };

    return objectOfBrowsers[browser_name];
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
    concerns_event_layer: "concerns_event_layer",
    disabled_nav: "disabled_nav",

    // Dates
    date_month: "date_month",
    date_day: "date_day",
    date_year: "date_year",

    // Form Keys
    name: "name",
    age: "age",
    email: "email",
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
    warning_shake: "warning_shake",

    // Browsers
    is_chrome: "is_chrome",
    is_firefox: "is_firefox",
    is_safari: "is_safari"
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
    max_number_of_pages: 6,
    max_number_of_pages_human: 7,

    // Age
    max_age: 150,
    min_age: 0,

    // Dates
    day_min: 1,
    day_max: 31, // TODO: Consider: leap year, different months.
    month_max: 12,
    month_min: 1,
    year_max: 2021, // Update every year or take dynamically.
    year_min: 1920, // For 100 years old people.

    // Business Logic
    max_amount_of_choices: 3,
    min_amount_of_choices: 1,
    max_amount_with_other_choice: 2,
    min_length_of_other_concern: 1
};

var DefaultErrorMessages = {
    // GENERAL
    numbers_only: "Numbers only",

    // NAME
    name: "Name is required",

    // AGE
    age_required: "Age is required",
    age_out_of_rage: "Your age seems too unrealistic",

    // LOCATION
    location_required: "Location is required",

    // Email
    email_required: "Email is required",
    email_wrong_format: "Wrong email format",

    // DATE AND TIME
    date_wrong: "Date is wrong", // General error.

    // TODO: Coming Soon!
    fill_date_entirely: "Fill date entirely",
    day_wrong: "Day is wrong",
    month_wrong: "Month is wrong",
    year_wrong: "Year is wrong",
    date_required: "Date is required",

    // INJURY REASON
    injury_reason_required: "Injury reason is required",

    // CONCERNS
    concerns_required: "At least one concern is required",
    more_than_three: "Can't choose more than three concerns",
    cant_type: "Can't type: you already made three choices"
};

export { SubmitButton, RegularButton, ErrorMessage, CSSClasses, validateEmail, debounce, isBrowser, SymbolicConstants, DefaultErrorMessages };