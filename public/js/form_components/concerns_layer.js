var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses, ErrorMessage, DefaultErrorMessages, SymbolicConstants, eIndexOf, eIncludes } from "./helper_components";
import { CauseOfInjury } from "./injury_layer";

var Concerns = function (_React$Component) {
    _inherits(Concerns, _React$Component);

    function Concerns(props) {
        _classCallCheck(this, Concerns);

        var _this = _possibleConstructorReturn(this, (Concerns.__proto__ || Object.getPrototypeOf(Concerns)).call(this, props));

        _this.displayOtherInput = function (element) {
            if (_this.state.other_input_disabled) return;

            var choiceName = element.querySelector("." + CSSClasses.default_choice_name);
            var choiceOtherInput = element.querySelector("." + CSSClasses.choice_other_raw_input);
            var choiceLetter = element.querySelector("." + CSSClasses.choice_letter);
            var checkElement = element.querySelector("." + CSSClasses.enabled_other_input);
            if (!choiceName || !choiceOtherInput || !choiceLetter) return;

            choiceName.classList.toggle(CSSClasses.hidden_element);
            choiceOtherInput.classList.toggle(CSSClasses.hidden_element);
            choiceLetter.classList.toggle(CSSClasses.hidden_element);
            checkElement.classList.toggle(CSSClasses.hidden_element);

            _this.state.other_input_disabled = !checkElement.classList.contains(CSSClasses.hidden_element);
        };

        _this.handleMoreThanRequiredChoices = function (element) {
            var errors = _this.props.errors;
            var form = _this.props.formState;
            var concerns = [].concat(_toConsumableArray(_this.props.formState.concerns));

            // More (or equal) than three element in 'concerns' array.
            if (!eIncludes(concerns, element.dataset.value) && concerns.length >= SymbolicConstants.max_amount_of_choices) errors = _this.props.prepareErrors(CSSClasses.concerns, { message: DefaultErrorMessages.more_than_three });
            // 2 elements in 'concerns' array and 'other_concern'.
            else if (!eIncludes(concerns, element.dataset.value) && concerns.length === SymbolicConstants.max_amount_with_other_choice && form[CSSClasses.concerns_other].length > 0) errors = _this.props.prepareErrors(CSSClasses.concerns, { message: DefaultErrorMessages.more_than_three });else errors = _this.props.prepareErrors(CSSClasses.concerns, false, true);

            return errors;
        };

        _this.handleChoiceAbsence = function (concerns, errors) {
            if (concerns.length < SymbolicConstants.min_amount_of_choices && _this.props.formState.concerns_other.length < SymbolicConstants.min_length_of_other_concern) errors = _this.props.prepareErrors(CSSClasses.concerns, { message: DefaultErrorMessages.concerns_required });
            return errors;
        };

        _this.animateShake = function () {
            var layer = document.querySelector("." + CSSClasses.concerns_event_layer);
            layer.classList.add(CSSClasses.warning_shake);

            setTimeout(function () {
                layer.classList.remove(CSSClasses.warning_shake);
            }, SymbolicConstants.shake_timeout);
        };

        _this.onCheck = function (e) {
            // Functionality
            if (e.target.classList.contains("solid_choice")) return;

            var element = void 0;
            if (e.target.hasAttribute("data-value")) element = e.target;else if (e.target.parentNode.hasAttribute("data-value")) element = e.target.parentNode;else if (e.target.parentNode.parentNode.hasAttribute("data-value")) element = e.target.parentNode.parentNode;

            if (element.querySelector("." + CSSClasses.choice_other_raw_input)) {
                return _this.displayOtherInput(element);
            }

            // Don't let to make more than required choices
            var errors = void 0;
            if ((errors = _this.handleMoreThanRequiredChoices(element)).hasOwnProperty(CSSClasses.concerns)) {
                _this.props.updateFormAndError(_this.props.formState, errors);
                _this.animateShake();
                return;
            }

            var concerns = [].concat(_toConsumableArray(_this.props.formState.concerns));
            if (eIncludes(concerns, element.dataset.value)) {
                var index = eIndexOf(concerns, element.dataset.value);
                if (index > -1) {
                    concerns.splice(index, 1);
                }
            } else {
                concerns.push(element.dataset.value);
            }

            // Choice is required checking.
            errors = _this.handleChoiceAbsence(concerns, errors);
            var form = _this.props.prepareForm(CSSClasses.concerns, concerns);

            _this.props.updateFormAndError(form, errors);

            // Design
            element.classList.toggle(CSSClasses.choice_is_made);
            var solidChoice = element.querySelector("." + CSSClasses.solid_choice);
            if (solidChoice.classList.contains(CSSClasses.solid_choice_is_made)) {
                _this.makeSolidChoiceElement(solidChoice);
            }
        };

        _this.isSolidChoice = function (checkedElement) {
            return _this.props.formState.solid_concern == checkedElement.dataset.value;
        };

        _this.displaySolidChoice = function (checkedElement) {
            if (_this.isSolidChoice(checkedElement)) return;
            var starEl = checkedElement.querySelector("." + CSSClasses.solid_choice);
            starEl.classList.remove(CSSClasses.hidden_element);
        };

        _this.hideSolidChoice = function (checkedElement) {
            if (_this.isSolidChoice(checkedElement)) return;
            var starEl = checkedElement.querySelector("." + CSSClasses.solid_choice);
            starEl.classList.add(CSSClasses.hidden_element);
        };

        _this.makeSolidChoiceElement = function (element) {
            if (!element.classList.contains(CSSClasses.solid_choice)) return;
            element.classList.toggle(CSSClasses.solid_choice_is_made);

            // Update state about solid choice.
            if (element.classList.contains(CSSClasses.solid_choice_is_made)) {
                var errors = _this.props.prepareErrors(CSSClasses.solid_concern, false, true); // Remove error.
                var form = _this.props.prepareForm(CSSClasses.solid_concern, element.dataset.solid_value);
                _this.props.updateFormAndError(form, errors);
            } else {
                var _errors = _this.props.prepareErrors(CSSClasses.solid_concern, { message: DefaultErrorMessages.solid_concern_required }); // Add error.
                var _form = _this.props.prepareForm(CSSClasses.solid_concern, "");
                _this.props.updateFormAndError(_form, _errors);
            }

            // Update solid choice button for other elements.
            var choices = document.querySelectorAll(".concerns ." + CSSClasses.choice_is_made);
            for (var i = 0; i < choices.length; i++) {
                if (_this.props.formState.solid_concern === "") _this.displaySolidChoice(choices[i]);else _this.hideSolidChoice(choices[i]);
            }
        };

        _this.makeSolidChoice = function (e) {
            _this.makeSolidChoiceElement(e.target);
        };

        _this.createCheckbox = function (key) {
            var value = _this.state.concerns[key];
            var checked = "";
            if (eIncludes(_this.props.formState.concerns, key)) checked = CSSClasses.choice_is_made;

            var solidChoice = "";
            if (_this.props.formState.solid_concern == key) solidChoice = CSSClasses.solid_choice_is_made;

            solidChoice = solidChoice === "" && _this.props.formState.solid_concern !== "" ? solidChoice + " hidden" : solidChoice;

            return React.createElement(
                "div",
                { key: value + ' ' + key, className: "choice_part " + checked, onClick: _this.onCheck, "data-value": key },
                React.createElement(
                    "div",
                    { className: "choice_name" },
                    value
                ),
                React.createElement(
                    "div",
                    { onClick: _this.makeSolidChoice, "data-solid_value": key, className: "solid_choice " + solidChoice },
                    "\u2605"
                )
            );
        };

        _this.unCheck = function (e) {
            if (!e.target.classList.contains(CSSClasses.enabled_other_input)) return;

            // Remove from choices
            _this.props.onValueUpdate(CSSClasses.concerns_other, "");

            // Remove decoration
            e.target.parentNode.classList.remove(CSSClasses.choice_is_made);
            var starElement = e.target.parentNode.parentElement.querySelector("." + CSSClasses.solid_choice);
            starElement.classList.remove(CSSClasses.solid_choice_is_made);

            _this.state.other_input_disabled = false;
        };

        _this.handleOk = function () {
            // Validation goes here.

            if (_this.props.formState[_this.prev_layer] == "") _this.props.changeToPrev();
        };

        _this.handleEnter = function (e) {
            if (e.keyCode === 13) // Enter is pressed.
                _this.handleOk();
        };

        _this.handleInput = function (e) {
            var errors = _this.props.errors;
            var form = _this.props.formState;
            if (_this.props.formState.concerns.length >= SymbolicConstants.max_amount_of_choices) {
                e.target.value = '';
                _this.animateShake();
                errors = _this.props.prepareErrors(CSSClasses.concerns, { message: DefaultErrorMessages.cant_type });
            } else {
                errors = _this.props.prepareErrors(CSSClasses.concerns, false, true);
                form = _this.props.prepareForm(CSSClasses.concerns_other, e.target.value);
            }

            _this.props.updateFormAndError(form, errors);
        };

        _this.otherInputRendering = function () {
            var valueToDisplay = "";
            var checked = "";
            if (_this.props.formState.concerns_other !== "") {
                valueToDisplay = _this.props.formState.concerns_other;
                checked = CSSClasses.choice_is_made;
            }

            var solidChoice = "";
            if (_this.props.formState.solid_concern == SymbolicConstants.other_concern_number) solidChoice = CSSClasses.solid_choice_is_made;

            return React.createElement(
                "div",
                { className: "choice_part " + checked, "data-value": SymbolicConstants.other_concern_number, onClick: _this.onCheck },
                React.createElement(
                    "div",
                    { className: "choice_name" },
                    React.createElement(
                        "span",
                        { className: "default_choice_name" },
                        "Other"
                    ),
                    React.createElement("input", { onChange: _this.handleInput, onKeyUp: _this.handleEnter,
                        id: "concerns_other", name: "concerns_other", className: "choice_other_raw_input hidden",
                        defaultValue: valueToDisplay, type: "text", placeholder: "Type your answer..." })
                ),
                React.createElement(
                    "div",
                    { className: "other_input_interaction" },
                    React.createElement(
                        "div",
                        { className: "enabled_other_input hidden", onClick: _this.unCheck },
                        "\u2713"
                    ),
                    React.createElement(
                        "div",
                        { onClick: _this.makeSolidChoice, "data-solid_value": SymbolicConstants.other_concern_number,
                            className: "solid_choice " + solidChoice },
                        "\u2605"
                    )
                )
            );
        };

        _this.hintOrAction = function () {
            if (_this.props.errors.hasOwnProperty(CSSClasses.concerns)) return React.createElement(ErrorMessage, { errors: _this.props.errors, field: CSSClasses.concerns });else if (_this.props.errors.hasOwnProperty(CSSClasses.solid_concern)) return React.createElement(ErrorMessage, { errors: _this.props.errors, field: CSSClasses.solid_concern });
        };

        _this.state = {
            concerns: {
                1: "Fatigue", 2: "Headaches", 3: "Dizziness",
                4: "Walking difficulties", 5: "Hand or arm difficulties", 6: "Sleeping difficulties",
                7: "Thinking difficulties", 8: "Emotional difficulties", 9: "Speaking difficulties",
                10: "Vision problems"
            },

            other_input_disabled: false
        };

        _this.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F',
            7: 'G', 8: 'H', 9: 'I', 10: 'J'
        };

        _this.prev_layer = CSSClasses.injury_reason;
        return _this;
    }

    // ERRORS HANDLING


    _createClass(Concerns, [{
        key: "render",
        value: function render() {
            // Prepare Checkbox array
            var checkboxItems = [];
            var checkboxItemsSecondColumn = [];
            for (var key in this.state.concerns) {
                if (key <= 6) checkboxItems.push(this.createCheckbox(key));else checkboxItemsSecondColumn.push(this.createCheckbox(key));
            }

            var otherInput = this.otherInputRendering();

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
                    "Check your ",
                    React.createElement(
                        "strong",
                        null,
                        "greatest concerns."
                    )
                )
            );
            if (this.props.formState.name !== "") label = React.createElement(
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
                    this.props.formState.name,
                    ", check your ",
                    React.createElement(
                        "strong",
                        null,
                        "greatest concerns."
                    )
                )
            );

            var validityElement = this.hintOrAction();

            return React.createElement(
                "section",
                { className: "concerns form_layer" },
                React.createElement(
                    "div",
                    { className: "event_layer concerns_event_layer" },
                    React.createElement(
                        "div",
                        { className: "layer_content" },
                        React.createElement(
                            "div",
                            { className: "questions concern_questions" },
                            label,
                            React.createElement(
                                "div",
                                { className: "question_usage_hint" },
                                "Check ",
                                React.createElement(
                                    "strong",
                                    null,
                                    "up to three"
                                ),
                                " and ",
                                React.createElement(
                                    "strong",
                                    null,
                                    "star (\u2605)"
                                ),
                                " the most troubling one."
                            ),
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
                )
            );
        }
    }]);

    return Concerns;
}(React.Component);

export { Concerns };