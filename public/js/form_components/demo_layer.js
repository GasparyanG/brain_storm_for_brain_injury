var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DemographicLayer = function (_React$Component) {
    _inherits(DemographicLayer, _React$Component);

    function DemographicLayer(props) {
        _classCallCheck(this, DemographicLayer);

        return _possibleConstructorReturn(this, (DemographicLayer.__proto__ || Object.getPrototypeOf(DemographicLayer)).call(this, props));
    }

    _createClass(DemographicLayer, [{
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
                { className: "demographic_information form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "layer_header" },
                        "Hi, tell me about you a little bit."
                    ),
                    React.createElement(
                        "div",
                        { className: "questions" },
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "name" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "1 ",
                                svgArrow
                            ),
                            "What is your ",
                            React.createElement(
                                "strong",
                                null,
                                "name"
                            ),
                            "?"
                        ),
                        React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                            name: "name", id: "name", type: "text", defaultValue: this.props.formState.name, placeholder: "Type your answer here..." }),
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "date_of_birth" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "2 ",
                                svgArrow
                            ),
                            "When did you ",
                            React.createElement(
                                "strong",
                                null,
                                "born"
                            ),
                            "?"
                        ),
                        React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                            name: "date_of_birth", id: "date_of_birth", type: "text", defaultValue: this.props.formState.age, placeholder: "Type your answer here..." }),
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "location" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "3 ",
                                svgArrow
                            ),
                            "Where do you ",
                            React.createElement(
                                "strong",
                                null,
                                "live"
                            ),
                            "?"
                        ),
                        React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                            name: "location", id: "location", type: "text", defaultValue: this.props.formState.location, placeholder: "Type your answer here..." })
                    )
                )
            );
        }
    }]);

    return DemographicLayer;
}(React.Component);

export { DemographicLayer };