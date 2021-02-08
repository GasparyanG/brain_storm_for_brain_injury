var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses, ErrorMessage, RegularButton, SymbolicConstants, DefaultErrorMessages } from "./helper_components";

var DateOfInjury = function (_React$Component) {
    _inherits(DateOfInjury, _React$Component);

    function DateOfInjury(props) {
        _classCallCheck(this, DateOfInjury);

        var _this = _possibleConstructorReturn(this, (DateOfInjury.__proto__ || Object.getPrototypeOf(DateOfInjury)).call(this, props));

        _this.handleOk = function () {
            // Dispatch.
            if (_this.props.errors.hasOwnProperty(CSSClasses.date)) return;

            if (_this.props.errors.hasOwnProperty(_this.prev_layer)) {
                _this.props.changeToPrev();
            } else _this.props.changeToNext();
        };

        _this.numbersOnly = function (e) {
            var errors = _this.props.prepareErrors(CSSClasses.date, { message: DefaultErrorMessages.numbers_only });
            _this.props.updateFormAndError(_this.props.formState, errors);

            var layer = document.querySelector("." + CSSClasses.doi_event_layer);
            layer.classList.add(CSSClasses.warning_shake);

            setTimeout(function () {
                layer.classList.remove(CSSClasses.warning_shake);
            }, SymbolicConstants.shake_timeout);
        };

        _this.handleInput = function (e) {
            if (isNaN(e.target.value)) {
                e.target.value = '';
                return _this.numbersOnly(e);
            }

            var errors = _this.props.errors;
            var form = _this.props.prepareForm(e.target.name, e.target.value);

            if (e.target.value == "") errors = _this.props.prepareErrors(CSSClasses.date, { message: DefaultErrorMessages.date_required });else if (e.target.classList.contains(CSSClasses.date_month)) {
                // Validate month
                if (e.target.value < SymbolicConstants.month_min || e.target.value > SymbolicConstants.month_max) errors = _this.props.prepareErrors(CSSClasses.date, { message: DefaultErrorMessages.date_wrong });

                // Navigate to next date field.
                else if (e.target.value.length >= 2) {
                        var dayInput = document.querySelector(".date_day");
                        dayInput.focus();
                    }
            } else if (e.target.classList.contains(CSSClasses.date_day)) {
                //Validate day
                if (e.target.value < SymbolicConstants.day_min || e.target.value > SymbolicConstants.day_max) errors = _this.props.prepareErrors(CSSClasses.date, { message: DefaultErrorMessages.date_wrong });

                // Navigate to next date field.
                else if (e.target.value.length >= 2) {
                        var yearInput = document.querySelector(".date_year");
                        yearInput.focus();
                    }
            } else if (e.target.classList.contains(CSSClasses.date_year)) {
                // Validate year
                if (e.target.value < SymbolicConstants.year_min || e.target.value > SymbolicConstants.year_max) errors = _this.props.prepareErrors(CSSClasses.date, { message: DefaultErrorMessages.date_wrong });
            }

            if (_this.props.isValidDate(form)) errors = _this.props.prepareErrors(CSSClasses.date, false, true);

            _this.props.updateFormAndError(form, errors);
        };

        _this.handleEnter = function (e) {
            // Call to handleOk when it's the last input.
            if (e.keyCode === SymbolicConstants.enter_key_code) {
                if (e.target.classList.contains("date_month")) {
                    // Validate month
                    _this.handleInput(e);
                    var dayInput = document.querySelector(".date_day");
                    dayInput.focus();
                } else if (e.target.classList.contains("date_day")) {
                    //Validate day
                    _this.handleInput(e);
                    var yearInput = document.querySelector(".date_year");
                    yearInput.focus();
                } else if (e.target.classList.contains("date_year")) {
                    // Validate year
                    _this.handleInput(e);
                    _this.handleOk();
                }
            }
        };

        _this.validateInput = function () {
            return !(_this.props.formState.injury_date_day == "" || _this.props.formState.injury_date_month == "" || _this.props.formState.injury_date_year == "");
        };

        _this.hintOrAction = function (field) {
            var isValid = _this.validateInput();
            if (_this.props.errors.hasOwnProperty(field)) return React.createElement(ErrorMessage, { errors: _this.props.errors, field: field });

            return React.createElement(RegularButton, { errors: _this.props.errors, isValid: isValid, formState: _this.props.formState, handleOk: _this.handleOk });
        };

        _this.prev_layer = CSSClasses.email;
        return _this;
    }

    _createClass(DateOfInjury, [{
        key: "render",
        value: function render() {
            var label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "injury_date" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "  ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        "When was"
                    ),
                    " your brain injury?"
                )
            );
            // if (this.props.formState.name !== "")
            //     label = (<label className="input_label" htmlFor="injury_date">
            //         <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, <strong>when was</strong> your brain injury?</span></label>);

            var validityElement = this.hintOrAction(CSSClasses.date);

            return React.createElement(
                "section",
                { className: "date_of_injury form_layer" },
                React.createElement(
                    "div",
                    { className: "event_layer doi_event_layer" },
                    React.createElement(
                        "div",
                        { className: "layer_content" },
                        React.createElement(
                            "div",
                            { className: "questions" },
                            label,
                            React.createElement(
                                "div",
                                { className: "date_input_section" },
                                React.createElement(
                                    "div",
                                    { className: "date_input_part date_input_part_dash date_input_month" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "injury_date_month", className: "date_section_name" },
                                        "Month"
                                    ),
                                    React.createElement("input", { onChange: this.handleInput, onKeyUp: this.handleEnter, defaultValue: this.props.formState.injury_date_month,
                                        id: "injury_date_month", name: "injury_date_month", className: "raw_date_input date_month", type: "text" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "date_input_part date_input_part_dash date_input_day" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "injury_date_day", className: "date_section_name" },
                                        "Day"
                                    ),
                                    React.createElement("input", { onChange: this.handleInput, onKeyUp: this.handleEnter, defaultValue: this.props.formState.injury_date_day,
                                        id: "injury_date_day", name: "injury_date_day", className: "raw_date_input date_day", type: "text" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "date_input_part date_input_year" },
                                    React.createElement(
                                        "label",
                                        { htmlFor: "injury_date_year", className: "date_section_name" },
                                        "Year"
                                    ),
                                    React.createElement("input", { onChange: this.handleInput, onKeyUp: this.handleEnter, defaultValue: this.props.formState.injury_date_year,
                                        id: "injury_date_year", name: "injury_date_year", className: "raw_date_input date_year", type: "text" })
                                )
                            ),
                            validityElement
                        )
                    )
                )
            );
        }
    }]);

    return DateOfInjury;
}(React.Component);

var CauseOfInjury = function (_React$Component2) {
    _inherits(CauseOfInjury, _React$Component2);

    function CauseOfInjury(props) {
        _classCallCheck(this, CauseOfInjury);

        var _this2 = _possibleConstructorReturn(this, (CauseOfInjury.__proto__ || Object.getPrototypeOf(CauseOfInjury)).call(this, props));

        _this2.displayOtherInput = function (element) {
            if (_this2.state.other_input_disabled) return;

            var choiceName = element.querySelector("." + CSSClasses.default_choice_name);
            var choiceOtherInput = element.querySelector("." + CSSClasses.choice_other_raw_input);
            // let choiceLetter = element.querySelector("." + CSSClasses.choice_letter);
            var checkElement = element.querySelector("." + CSSClasses.enabled_other_input);
            if (!choiceName || !choiceOtherInput /*|| !choiceLetter*/) return;

            choiceName.classList.toggle(CSSClasses.hidden_element);
            choiceOtherInput.classList.toggle(CSSClasses.hidden_element);
            // choiceLetter.classList.toggle(CSSClasses.hidden_element);
            checkElement.classList.toggle(CSSClasses.hidden_element);

            _this2.state.other_input_disabled = !checkElement.classList.contains(CSSClasses.hidden_element);
        };

        _this2.onCheck = function (e) {
            // Functionality
            var element = void 0;
            if (e.target.hasAttribute("data-value")) element = e.target;else if (e.target.parentNode.hasAttribute("data-value")) element = e.target.parentNode;else if (e.target.parentNode.parentNode.hasAttribute("data-value")) element = e.target.parentNode.parentNode;

            if (element.querySelector("." + CSSClasses.choice_other_raw_input)) {
                return _this2.displayOtherInput(element);
            }

            // Design
            element.classList.toggle(CSSClasses.choice_is_made);

            if (element.classList.contains(CSSClasses.choice_is_made)) {
                var form = _this2.props.prepareForm(CSSClasses.injury_reason, element.dataset.value);
                var errors = _this2.props.prepareErrors(CSSClasses.injury_reason, false, true);

                _this2.props.updateFormAndError(form, errors);

                // After single choice change page.
                setTimeout(_this2.handleOk, SymbolicConstants.page_change_timout);
            } else {
                var _form = _this2.props.prepareForm(CSSClasses.injury_reason, "");
                var _errors = _this2.props.prepareErrors(CSSClasses.injury_reason, { message: DefaultErrorMessages.injury_reason_required });

                _this2.props.updateFormAndError(_form, _errors);
            }
        };

        _this2.unCheck = function (e) {
            if (!e.target.classList.contains(CSSClasses.enabled_other_input)) return;

            // Remove from choices
            var form = _this2.props.prepareForm(CSSClasses.injury_reason, "");
            var errors = _this2.props.prepareErrors(CSSClasses.injury_reason, { message: DefaultErrorMessages.injury_reason_required });

            _this2.props.updateFormAndError(form, errors);

            // Remove decoration
            var parentElement = e.target.parentNode.classList.remove(CSSClasses.choice_is_made);

            _this2.state.other_input_disabled = false;
        };

        _this2.handleOk = function () {
            // Validation goes here.

            if (_this2.props.errors.hasOwnProperty(CSSClasses.injury_reason)) return;

            if (!_this2.props.isValidDate(_this2.props.formState)) _this2.props.changeToPrev();else _this2.props.changeToNext();
        };

        _this2.handleEnter = function (e) {
            if (e.keyCode === 13) _this2.handleOk();
        };

        _this2.handleInput = function (e) {
            var errors = void 0;
            var form = _this2.props.prepareForm(e.target.name, e.target.value);

            if (e.target.value !== "") {
                errors = _this2.props.prepareErrors(CSSClasses.injury_reason, false, true);
            } else errors = _this2.props.prepareErrors(CSSClasses.injury_reason, { message: DefaultErrorMessages.injury_reason_required });

            _this2.props.updateFormAndError(form, errors);
        };

        _this2.otherInputRendering = function () {
            var valueToDisplay = "";
            var checked = "";
            if (_this2.props.formState.injury_reason !== "" && _this2.props.formState.injury_reason.length > 1) {
                valueToDisplay = _this2.props.formState.injury_reason;
                checked = CSSClasses.choice_is_made;
            }

            return React.createElement(
                "div",
                { className: "choice_part " + checked, "data-value": "6", onClick: _this2.onCheck },
                React.createElement(
                    "div",
                    { className: "choice_name" },
                    React.createElement(
                        "span",
                        { className: "default_choice_name" },
                        "Other"
                    ),
                    React.createElement("input", { onChange: _this2.handleInput, onKeyUp: _this2.handleEnter, id: "injury_reason", name: "injury_reason", className: "choice_other_raw_input hidden", defaultValue: valueToDisplay, type: "text", placeholder: "Type your answer..." })
                ),
                React.createElement(
                    "div",
                    { className: "enabled_other_input hidden", onClick: _this2.unCheck },
                    "\u2713"
                )
            );
        };

        _this2.hintOrAction = function (field) {
            if (_this2.props.errors.hasOwnProperty(field)) return React.createElement(ErrorMessage, { errors: _this2.props.errors, field: field });
        };

        _this2.state = {
            concerns: {
                1: "Traumatic brain injury", 2: "Stroke", 3: "Cerebral palsy",
                4: "Tumor", 5: "Infection"
            },

            other_input_disabled: false
        };

        _this2.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F'
        };
        return _this2;
    }

    _createClass(CauseOfInjury, [{
        key: "createCheckbox",
        value: function createCheckbox(key) {
            var value = this.state.concerns[key];
            var checked = "";
            if (this.props.formState.injury_reason === key) checked = CSSClasses.choice_is_made;

            return React.createElement(
                "div",
                { key: value + ' ' + key, className: "choice_part " + checked, onClick: this.onCheck, "data-value": key },
                React.createElement(
                    "div",
                    { className: "choice_name" },
                    value
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "injury_reason" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "  ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    "What was ",
                    React.createElement(
                        "strong",
                        null,
                        "the cause"
                    ),
                    " of injury?"
                )
            );
            // if (this.props.formState.name !== "")
            //     label = (<label className="input_label" htmlFor="injury_reason">
            //         <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, what was <strong>the cause</strong> of injury?</span></label>);

            var checkboxItems = [];
            var checkboxItemsSecondColumn = [];
            for (var key in this.state.concerns) {
                if (key <= 3) checkboxItems.push(this.createCheckbox(key));else checkboxItemsSecondColumn.push(this.createCheckbox(key));
            }

            var otherInput = this.otherInputRendering();
            var validityElement = this.hintOrAction(CSSClasses.injury_reason);

            return React.createElement(
                "section",
                { className: "cause_of_injury form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        label,
                        React.createElement(
                            "div",
                            { className: "choices_section" },
                            React.createElement(
                                "div",
                                { className: "checkbox_column" },
                                checkboxItems
                            ),
                            React.createElement(
                                "div",
                                { className: "checkbox_column" },
                                checkboxItemsSecondColumn,
                                otherInput
                            )
                        ),
                        validityElement
                    )
                )
            );
        }
    }]);

    return CauseOfInjury;
}(React.Component);

export { DateOfInjury, CauseOfInjury };