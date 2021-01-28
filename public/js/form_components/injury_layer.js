var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InjuryIdentifier = function (_React$Component) {
    _inherits(InjuryIdentifier, _React$Component);

    function InjuryIdentifier(props) {
        _classCallCheck(this, InjuryIdentifier);

        return _possibleConstructorReturn(this, (InjuryIdentifier.__proto__ || Object.getPrototypeOf(InjuryIdentifier)).call(this, props));
    }

    _createClass(InjuryIdentifier, [{
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
                { className: "injury_identification form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "layer_header" },
                        "Now, let's fill some information about your injury."
                    ),
                    React.createElement(
                        "div",
                        { className: "questions" },
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "injury_date" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "1 ",
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
                            name: "injury_date", id: "injury_date", type: "text", defaultValue: this.props.formState.name, placeholder: "Type your answer here..." }),
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "injury_cause" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "3 ",
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
                            name: "injury_cause", id: "injury_cause", type: "text", defaultValue: this.props.formState.location, placeholder: "Type your answer here..." })
                    )
                )
            );
        }
    }]);

    return InjuryIdentifier;
}(React.Component);

export { InjuryIdentifier };