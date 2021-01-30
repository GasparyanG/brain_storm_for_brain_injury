var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses, ErrorMessage, DefaultErrorMessages, RegularButton } from "./helper_components";

var Name = function (_React$Component) {
    _inherits(Name, _React$Component);

    function Name(props) {
        _classCallCheck(this, Name);

        var _this = _possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).call(this, props));

        _this.handleOk = function () {
            // Validation goes here.
            if (!_this.props.errors.hasOwnProperty("name")) _this.props.changeToNext();
        };

        _this.handleEnter = function (e) {
            if (e.keyCode === 13) _this.handleOk();
        };

        _this.handleInput = function (e) {
            _this.props.handler(e);

            if (e.target.value !== "") {
                _this.props.onError("name", false, true);
            } else _this.props.onError("name", { message: DefaultErrorMessages.name });
        };

        _this.validateInput = function () {
            if (_this.props.formState.name !== "") return true;
            return false;
        };

        _this.hintOrAction = function (field) {
            var isValid = _this.validateInput();
            if (_this.props.errors.hasOwnProperty(field)) return React.createElement(ErrorMessage, { errors: _this.props.errors, field: field });

            return React.createElement(RegularButton, { errors: _this.props.errors, isValid: isValid, formState: _this.props.formState, handleOk: _this.handleOk });
        };

        return _this;
    }

    _createClass(Name, [{
        key: "render",
        value: function render() {
            var validityElement = this.hintOrAction(CSSClasses.name);

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
                            React.createElement(
                                "span",
                                null,
                                "Let's start with your ",
                                React.createElement(
                                    "strong",
                                    null,
                                    "name"
                                ),
                                "."
                            )
                        ),
                        React.createElement("input", { onChange: this.handleInput, onKeyUp: this.handleEnter, className: "raw_input",
                            name: "name", id: "name", type: "text", defaultValue: this.props.formState.name, placeholder: "Type here..." }),
                        validityElement
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

        var _this2 = _possibleConstructorReturn(this, (Age.__proto__ || Object.getPrototypeOf(Age)).call(this, props));

        _this2.handleOk = function () {
            // Validation goes here.

            if (_this2.props.errors.hasOwnProperty("age")) return;

            if (_this2.props.formState[_this2.prev_layer] == "") _this2.props.changeToPrev();else _this2.props.changeToNext();
        };

        _this2.handleEnter = function (e) {
            if (e.keyCode === 13) _this2.handleOk();
        };

        _this2.numbersOnly = function () {
            _this2.props.onError("age", { message: DefaultErrorMessages.age_numbers });
            // let layer = document.querySelector("." + CSSClasses.user_age);
            // layer.classList.add(CSSClasses.warning_shake);
            //
            // setTimeout(() => {layer.classList.remove(CSSClasses.warning_shake)}, 2000)
        };

        _this2.handleInput = function (e) {
            if (isNaN(e.target.value)) {
                e.target.value = '';
                return _this2.numbersOnly();
            }

            _this2.props.handler(e);

            if (e.target.value !== "") _this2.props.onError("age", false, true);
        };

        _this2.validateInput = function () {
            if (_this2.props.formState.age !== "") return true;
            return false;
        };

        _this2.hintOrAction = function (field) {
            var isValid = _this2.validateInput();
            if (_this2.props.errors.hasOwnProperty(field)) return React.createElement(ErrorMessage, { errors: _this2.props.errors, field: field });

            return React.createElement(RegularButton, { errors: _this2.props.errors, isValid: isValid, formState: _this2.props.formState, handleOk: _this2.handleOk });
        };

        _this2.prev_layer = CSSClasses.name;
        return _this2;
    }

    _createClass(Age, [{
        key: "render",
        value: function render() {
            var label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "age" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "2 ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    "How ",
                    React.createElement(
                        "strong",
                        null,
                        "old"
                    ),
                    " are you?"
                )
            );
            if (this.props.formState.name !== "") label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "age" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "2 ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    this.props.formState.name,
                    ", how ",
                    React.createElement(
                        "strong",
                        null,
                        "old"
                    ),
                    " are you?"
                )
            );

            var validityElement = this.hintOrAction(CSSClasses.age);

            return React.createElement(
                "section",
                { className: "user_age form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        label,
                        React.createElement("input", { onChange: this.handleInput, onKeyUp: this.handleEnter, className: "raw_input",
                            name: "age", id: "age", type: "text", defaultValue: this.props.formState.age, placeholder: "Type your answer here..." }),
                        validityElement
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

        var _this3 = _possibleConstructorReturn(this, (Location.__proto__ || Object.getPrototypeOf(Location)).call(this, props));

        _this3.handleOk = function () {
            // Validation goes here.

            if (_this3.props.formState[_this3.prev_layer] == "") _this3.props.changeToPrev();else _this3.props.changeToNext();
        };

        _this3.handleEnter = function (e) {
            if (e.keyCode === 13) // Enter is pressed.
                _this3.handleOk();
        };

        _this3.validateInput = function () {
            if (_this3.props.formState.location !== "") return true;
            return false;
        };

        _this3.prev_layer = CSSClasses.age;
        return _this3;
    }

    _createClass(Location, [{
        key: "render",
        value: function render() {
            var label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "date_of_birth" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "3 ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    "Where do you ",
                    React.createElement(
                        "strong",
                        null,
                        "live"
                    ),
                    "?"
                )
            );
            if (this.props.formState.name !== "") label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "date_of_birth" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "3 ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    this.props.formState.name,
                    ", where do you ",
                    React.createElement(
                        "strong",
                        null,
                        "live"
                    ),
                    "?"
                )
            );

            var isValid = this.validateInput();

            return React.createElement(
                "section",
                { className: "user_location form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        label,
                        React.createElement("input", { onChange: this.props.handler, onKeyUp: this.handleEnter, className: "raw_input",
                            name: "location", id: "location", type: "text", defaultValue: this.props.formState.location, placeholder: "Type your answer here..." }),
                        React.createElement(RegularButton, { isValid: isValid, handleOk: this.handleOk })
                    )
                )
            );
        }
    }]);

    return Location;
}(React.Component);

export { Name, Age, Location };