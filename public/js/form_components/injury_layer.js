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
                { className: "input_label", htmlFor: "date_of_birth" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "2 ",
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
                { className: "input_label", htmlFor: "date_of_birth" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "2 ",
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
                { className: "injury_identification form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        label,
                        React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                            name: "location", id: "location", type: "text", defaultValue: this.props.formState.location, placeholder: "Type your answer here..." }),
                        React.createElement(RegularButton, null),
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "injury_date" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "4 ",
                                svgArrow
                            ),
                            React.createElement(
                                "strong",
                                null,
                                "When was"
                            ),
                            " your brain injury?"
                        ),
                        React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                            name: "injury_date", id: "injury_date", type: "text", defaultValue: this.props.formState.injury_date, placeholder: "Type your answer here..." })
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
                { className: "input_label", htmlFor: "date_of_birth" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "2 ",
                    this.props.svgArrow
                ),
                "Where do you ",
                React.createElement(
                    "strong",
                    null,
                    "live"
                ),
                "?"
            );
            if (this.props.formState.name !== "") label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "date_of_birth" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "2 ",
                    this.props.svgArrow
                ),
                this.props.formState.name,
                ", where do you ",
                React.createElement(
                    "strong",
                    null,
                    "live"
                ),
                "?"
            );

            return React.createElement(
                "section",
                { className: "injury_identification form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "injury_cause" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "5 ",
                                svgArrow
                            ),
                            "What was ",
                            React.createElement(
                                "strong",
                                null,
                                "the cause"
                            ),
                            " of injury?"
                        ),
                        React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                            name: "injury_cause", id: "injury_cause", type: "text", defaultValue: this.props.formState.injury_reason, placeholder: "Type your answer here..." })
                    )
                )
            );
        }
    }]);

    return CauseOfInjury;
}(React.Component);

export { DateOfInjury, CauseOfInjury };