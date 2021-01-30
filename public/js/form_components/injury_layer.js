var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses, RegularButton } from "./helper_components";

var DateOfInjury = function (_React$Component) {
    _inherits(DateOfInjury, _React$Component);

    function DateOfInjury(props) {
        _classCallCheck(this, DateOfInjury);

        var _this = _possibleConstructorReturn(this, (DateOfInjury.__proto__ || Object.getPrototypeOf(DateOfInjury)).call(this, props));

        _this.handleOk = function () {
            // Validation goes here.

            _this.props.changeToNext();
        };

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
                    "4 ",
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
            if (this.props.formState.name !== "") label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "injury_date" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "4 ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    this.props.formState.name,
                    ", ",
                    React.createElement(
                        "strong",
                        null,
                        "when was"
                    ),
                    " your brain injury?"
                )
            );

            return React.createElement(
                "section",
                { className: "date_of_injury form_layer" },
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
                                React.createElement("input", { onChange: this.props.handler, id: "injury_date_month", name: "injury_date_month", className: "raw_date_input", type: "text" })
                            ),
                            React.createElement(
                                "div",
                                { className: "date_input_part date_input_part_dash date_input_day" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "injury_date_day", className: "date_section_name" },
                                    "Day"
                                ),
                                React.createElement("input", { onChange: this.props.handler, id: "injury_date_day", name: "injury_date_day", className: "raw_date_input", type: "text" })
                            ),
                            React.createElement(
                                "div",
                                { className: "date_input_part date_input_year" },
                                React.createElement(
                                    "label",
                                    { htmlFor: "injury_date_year", className: "date_section_name" },
                                    "Year"
                                ),
                                React.createElement("input", { onChange: this.props.handler, id: "injury_date_year", name: "injury_date_year", className: "raw_date_input", type: "text" })
                            )
                        ),
                        React.createElement(RegularButton, { handleOk: this.handleOk })
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
            var choiceLetter = element.querySelector("." + CSSClasses.choice_letter);
            var checkElement = element.querySelector("." + CSSClasses.enabled_other_input);
            if (!choiceName || !choiceOtherInput || !choiceLetter) return;

            choiceName.classList.toggle(CSSClasses.hidden_element);
            choiceOtherInput.classList.toggle(CSSClasses.hidden_element);
            choiceLetter.classList.toggle(CSSClasses.hidden_element);
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

            _this2.props.checkboxHandler("injury_reason", element.dataset.value);

            // Design
            element.classList.toggle(CSSClasses.choice_is_made);
        };

        _this2.unCheck = function (e) {
            if (!e.target.classList.contains(CSSClasses.enabled_other_input)) return;

            // Remove from choices
            _this2.props.onValueUpdate(CSSClasses.injury_reason, "");

            // Remove decoration
            var parentElement = e.target.parentNode.classList.remove(CSSClasses.choice_is_made);

            _this2.state.other_input_disabled = false;
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
                    React.createElement("input", { onChange: _this2.props.handler, id: "injury_reason", name: "injury_reason", className: "choice_other_raw_input hidden", defaultValue: valueToDisplay, type: "text", placeholder: "Type your answer..." })
                ),
                React.createElement(
                    "div",
                    { className: "enabled_other_input hidden", onClick: _this2.unCheck },
                    "\u2713"
                )
            );
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
                    { className: "choice_letter" },
                    this.letters[key]
                ),
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
                    "5 ",
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
            if (this.props.formState.name !== "") label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "injury_reason" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "5 ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    this.props.formState.name,
                    ", what was ",
                    React.createElement(
                        "strong",
                        null,
                        "the cause"
                    ),
                    " of injury?"
                )
            );

            var checkboxItems = [];
            for (var key in this.state.concerns) {
                checkboxItems.push(this.createCheckbox(key));
            }

            var otherInput = this.otherInputRendering();

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
                            checkboxItems,
                            otherInput
                        )
                    )
                )
            );
        }
    }]);

    return CauseOfInjury;
}(React.Component);

export { DateOfInjury, CauseOfInjury };