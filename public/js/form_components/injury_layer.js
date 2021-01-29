var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { RegularButton } from "./helper_components";

var DateOfInjury = function (_React$Component) {
    _inherits(DateOfInjury, _React$Component);

    function DateOfInjury(props) {
        _classCallCheck(this, DateOfInjury);

        return _possibleConstructorReturn(this, (DateOfInjury.__proto__ || Object.getPrototypeOf(DateOfInjury)).call(this, props));
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
                    "strong",
                    null,
                    "When was"
                ),
                " your brain injury?"
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
                this.props.formState.name,
                ", ",
                React.createElement(
                    "strong",
                    null,
                    "when was"
                ),
                " your brain injury??"
            );

            return React.createElement(
                "section",
                { className: "date_of_injury form_layer hidden" },
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
                                    { className: "date_section_name" },
                                    "Month"
                                ),
                                React.createElement("input", { className: "raw_date_input", type: "text" })
                            ),
                            React.createElement(
                                "div",
                                { className: "date_input_part date_input_part_dash date_input_day" },
                                React.createElement(
                                    "label",
                                    { className: "date_section_name" },
                                    "Day"
                                ),
                                React.createElement("input", { className: "raw_date_input", type: "text" })
                            ),
                            React.createElement(
                                "div",
                                { className: "date_input_part date_input_year" },
                                React.createElement(
                                    "label",
                                    { className: "date_section_name" },
                                    "Year"
                                ),
                                React.createElement("input", { className: "raw_date_input", type: "text" })
                            )
                        ),
                        React.createElement(RegularButton, null)
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

        return _possibleConstructorReturn(this, (CauseOfInjury.__proto__ || Object.getPrototypeOf(CauseOfInjury)).call(this, props));
    }

    _createClass(CauseOfInjury, [{
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
                "What was ",
                React.createElement(
                    "strong",
                    null,
                    "the cause"
                ),
                " of injury?"
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
                this.props.formState.name,
                ", what was ",
                React.createElement(
                    "strong",
                    null,
                    "the cause"
                ),
                " of injury?"
            );

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
                                { className: "choice_part" },
                                React.createElement(
                                    "div",
                                    { className: "choice_letter" },
                                    "A"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "choice_name" },
                                    "Traumatic brain injury"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "choice_part" },
                                React.createElement(
                                    "div",
                                    { className: "choice_letter" },
                                    "B"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "choice_name" },
                                    "Stroke"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "choice_part" },
                                React.createElement(
                                    "div",
                                    { className: "choice_letter" },
                                    "C"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "choice_name" },
                                    "Cerebral palsy"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "choice_part" },
                                React.createElement(
                                    "div",
                                    { className: "choice_letter" },
                                    "D"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "choice_name" },
                                    "Tumor"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "choice_part" },
                                React.createElement(
                                    "div",
                                    { className: "choice_letter" },
                                    "E"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "choice_name" },
                                    "Infection"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "choice_part" },
                                React.createElement(
                                    "div",
                                    { className: "choice_letter" },
                                    "F"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "choice_name" },
                                    React.createElement(
                                        "span",
                                        null,
                                        "Other"
                                    ),
                                    React.createElement("input", { className: "choice_other_raw_input hidden", type: "text", placeholder: "Type your answer..." })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CauseOfInjury;
}(React.Component);

export { DateOfInjury, CauseOfInjury };