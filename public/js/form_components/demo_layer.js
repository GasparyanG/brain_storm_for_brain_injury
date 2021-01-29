var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Name = function (_React$Component) {
    _inherits(Name, _React$Component);

    function Name(props) {
        _classCallCheck(this, Name);

        return _possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).call(this, props));
    }

    _createClass(Name, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "section",
                { className: "user_name form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
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
                                this.props.svgArrow
                            ),
                            "Let's start with your name"
                        ),
                        React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                            name: "name", id: "name", type: "text", defaultValue: this.props.formState.name, placeholder: "Type your answer here..." })
                    )
                )
            );
        }
    }]);

    return Name;
}(React.Component);

var Age = function (_React$Component2) {
    _inherits(Age, _React$Component2);

    function Age(props) {
        _classCallCheck(this, Age);

        return _possibleConstructorReturn(this, (Age.__proto__ || Object.getPrototypeOf(Age)).call(this, props));
    }

    _createClass(Age, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "section",
                { className: "user_age form_layer hidden" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "date_of_birth" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "2 ",
                                this.props.svgArrow
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
                            name: "date_of_birth", id: "date_of_birth", type: "text", defaultValue: this.props.formState.age, placeholder: "Type your answer here..." })
                    )
                )
            );
        }
    }]);

    return Age;
}(React.Component);

var Location = function (_React$Component3) {
    _inherits(Location, _React$Component3);

    function Location(props) {
        _classCallCheck(this, Location);

        return _possibleConstructorReturn(this, (Location.__proto__ || Object.getPrototypeOf(Location)).call(this, props));
    }

    _createClass(Location, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "section",
                { className: "user_location form_layer hidden" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        React.createElement(
                            "label",
                            { className: "input_label", htmlFor: "location" },
                            React.createElement(
                                "span",
                                { className: "question_number" },
                                "3 ",
                                this.props.svgArrow
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

    return Location;
}(React.Component);

export { Name, Age, Location };