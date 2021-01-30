var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses } from "./helper_components";
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

        _this.onCheck = function (e) {
            // Functionality
            if (e.target.classList.contains("solid_choice")) return;

            var element = void 0;
            if (e.target.hasAttribute("data-value")) element = e.target;else if (e.target.parentNode.hasAttribute("data-value")) element = e.target.parentNode;else if (e.target.parentNode.parentNode.hasAttribute("data-value")) element = e.target.parentNode.parentNode;

            if (element.querySelector("." + CSSClasses.choice_other_raw_input)) {
                return _this.displayOtherInput(element);
            }

            // Don't let to make more than 4 choices
            // Coming soon!

            var concerns = [].concat(_toConsumableArray(_this.props.formState.concerns));
            if (concerns.includes(element.dataset.value)) {
                var index = concerns.indexOf(element.dataset.value);
                if (index > -1) {
                    concerns.splice(index, 1);
                }
            } else {
                concerns.push(element.dataset.value);
            }

            _this.props.checkboxHandler("concerns", concerns);

            // Design
            element.classList.toggle(CSSClasses.choice_is_made);
        };

        _this.makeSolidChoice = function (e) {
            if (!e.target.classList.contains(CSSClasses.solid_choice)) return;
            e.target.classList.toggle("solid_choice_is_made");

            // Update state about solid choice.
        };

        _this.unCheck = function (e) {
            if (!e.target.classList.contains(CSSClasses.enabled_other_input)) return;

            // Remove from choices
            _this.props.onValueUpdate(CSSClasses.concerns_other, "");

            // Remove decoration
            var parentElement = e.target.parentNode.classList.remove(CSSClasses.choice_is_made);

            _this.state.other_input_disabled = false;
        };

        _this.handleOk = function () {
            // Validation goes here.

            _this.props.changeToNext();
        };

        _this.handleEnter = function (e) {
            if (e.keyCode === 13) // Enter is pressed.
                _this.handleOk();
        };

        _this.otherInputRendering = function () {
            var valueToDisplay = "";
            var checked = "";
            if (_this.props.formState.concerns_other !== "") {
                valueToDisplay = _this.props.formState.concerns_other;
                checked = CSSClasses.choice_is_made;
            }

            return React.createElement(
                "div",
                { className: "choice_part " + checked, "data-value": "14", onClick: _this.onCheck },
                React.createElement(
                    "div",
                    { className: "choice_letter" },
                    "N"
                ),
                React.createElement(
                    "div",
                    { className: "choice_name" },
                    React.createElement(
                        "span",
                        { className: "default_choice_name" },
                        "Other"
                    ),
                    React.createElement("input", { onChange: _this.props.handler, onKeyUp: _this.handleEnter,
                        id: "concerns_other", name: "concerns_other", className: "choice_other_raw_input hidden",
                        defaultValue: valueToDisplay, type: "text", placeholder: "Type your answer..." })
                ),
                React.createElement(
                    "div",
                    { className: "enabled_other_input hidden", onClick: _this.unCheck },
                    "\u2713"
                )
            );
        };

        _this.state = {
            concerns: {
                1: "Headaches", 2: "Pain", 3: "Fatigue",
                4: "Balance difficulties", 5: "Dizziness", 6: "Vision problems",
                7: "Hearing problems", 8: "Light or sound sensitivity", 9: "Trouble sleeping",
                10: "Thinking difficulties", 11: "Speaking or understanding difficulties", 12: "Mood difficulties",
                13: "Depression or anxiety"
            },

            other_input_disabled: false
        };

        _this.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F',
            7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L', 13: 'M'
        };
        return _this;
    }

    _createClass(Concerns, [{
        key: "createCheckbox",
        value: function createCheckbox(key) {
            var value = this.state.concerns[key];
            var checked = "";
            if (this.props.formState.concerns.includes(key)) checked = CSSClasses.choice_is_made;

            return React.createElement(
                "div",
                { key: value + ' ' + key, className: "choice_part " + checked, onClick: this.onCheck, "data-value": key },
                React.createElement(
                    "div",
                    { className: "choice_letter" },
                    this.letters[key]
                ),
                React.createElement(
                    "div",
                    { className: "choice_name" },
                    value
                ),
                React.createElement(
                    "div",
                    { onClick: this.makeSolidChoice, className: "solid_choice" },
                    "\u2605"
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            // Prepare Checkbox array
            var checkboxItems = [];
            for (var key in this.state.concerns) {
                checkboxItems.push(this.createCheckbox(key));
            }

            var otherInput = this.otherInputRendering();

            var label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "injury_date" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "6 ",
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
                    "6 ",
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

            return React.createElement(
                "section",
                { className: "concerns form_layer" },
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
                                "up to four"
                            ),
                            " and ",
                            React.createElement(
                                "strong",
                                null,
                                "star"
                            ),
                            " the most troubling one."
                        ),
                        React.createElement(
                            "div",
                            { className: "choices_section" },
                            checkboxItems,
                            otherInput
                        )
                    )
                )
            );
        }
    }]);

    return Concerns;
}(React.Component);

export { Concerns };