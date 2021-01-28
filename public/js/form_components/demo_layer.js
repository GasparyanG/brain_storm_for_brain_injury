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
            return React.createElement(
                "section",
                { className: "demographic_information form_layer" },
                React.createElement(
                    "h1",
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
                            "1 \u2192"
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
                        name: "name", id: "name", type: "text", defaultValue: this.props.formState.name }),
                    React.createElement(
                        "label",
                        { className: "input_label", htmlFor: "age" },
                        React.createElement(
                            "span",
                            { className: "question_number" },
                            "2 \u2192"
                        ),
                        "When did you born?"
                    ),
                    React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                        name: "age", id: "age", type: "text", defaultValue: this.props.formState.age }),
                    React.createElement(
                        "label",
                        { className: "input_label", htmlFor: "location" },
                        React.createElement(
                            "span",
                            { className: "question_number" },
                            "3 \u2192"
                        ),
                        "Where do you live?"
                    ),
                    React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                        name: "location", id: "location", type: "text", defaultValue: this.props.formState.location })
                )
            );
        }
    }]);

    return DemographicLayer;
}(React.Component);

export { DemographicLayer };