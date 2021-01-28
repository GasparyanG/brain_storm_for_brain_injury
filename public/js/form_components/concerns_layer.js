var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Concerns = function (_React$Component) {
    _inherits(Concerns, _React$Component);

    function Concerns(props) {
        _classCallCheck(this, Concerns);

        return _possibleConstructorReturn(this, (Concerns.__proto__ || Object.getPrototypeOf(Concerns)).call(this, props));
    }

    _createClass(Concerns, [{
        key: "render",
        value: function render() {
            var svgArrow = React.createElement(
                "svg",
                { height: "10", width: "11" },
                React.createElement("path", { d: "M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z" }),
                React.createElement("path", { d: "M8 4v2H0V4z" })
            );
            return React.createElement(
                "section",
                { className: "concerns form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "layer_header" },
                        "Finally, concerns."
                    ),
                    React.createElement(
                        "div",
                        { className: "questions concern_questions" },
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "injury_date" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "5 ",
                                svgArrow
                            ),
                            "Check your ",
                            React.createElement(
                                "strong",
                                null,
                                "greatest concerns"
                            ),
                            " (check ",
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
                            " the most troubling one)"
                        ),
                        React.createElement(
                            "div",
                            { className: "checkbox_container" },
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_1", name: "c_1", "data-value": "1", value: "Headaches" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_1" },
                                    " Headaches"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_2", name: "c_2", "data-value": "2", value: "Pain" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_2" },
                                    " Pain"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_3", name: "c_3", "data-value": "3", value: "Fatigue" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_3" },
                                    " Fatigue"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_4", name: "c_4", "data-value": "4", value: "Balance difficulties" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_4" },
                                    " Balance difficulties"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_5", name: "c_5", "data-value": "5", value: "Dizziness" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_5" },
                                    " Dizziness"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_6", name: "c_6", "data-value": "6", value: "Vision problems" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_6" },
                                    " Vision problems"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_7", name: "c_7", "data-value": "7", value: "Hearing problems" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_7" },
                                    " Hearing problems"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_8", name: "c_8", "data-value": "8", value: "Light or sound sensitivity" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_8" },
                                    " Light or sound sensitivity"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_9", name: "c_9", "data-value": "9", value: "Trouble sleeping" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_9" },
                                    " Trouble sleeping"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_10", name: "c_10", "data-value": "10", value: "Thinking difficulties (memory, attention, planning, getting started)" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_10" },
                                    " Thinking difficulties"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_11", name: "c_11", "data-value": "11", value: "Speaking or understanding difficulties" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_11" },
                                    " Speaking or understanding difficulties"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_12", name: "c_12", "data-value": "12", value: "Mood difficulties (agitation, irritability)" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_12" },
                                    " Mood difficulties"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("input", { className: "checkbox_input", type: "checkbox", id: "c_13", name: "c_13", "data-value": "13", value: "Depression or anxiety" }),
                                React.createElement(
                                    "label",
                                    { className: "checkbox_label", htmlFor: "c_13" },
                                    " Depression or anxiety"
                                )
                            ),
                            React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                                name: "injury_date", id: "injury_date", type: "text", defaultValue: this.props.formState.name, placeholder: "Other" })
                        )
                    )
                )
            );
        }
    }]);

    return Concerns;
}(React.Component);

export { Concerns };