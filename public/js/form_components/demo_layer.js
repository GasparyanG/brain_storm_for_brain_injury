var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses, SymbolicConstants, ErrorMessage, validateEmail, DefaultErrorMessages, RegularButton } from "./helper_components";

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
            var errors = void 0;
            var form = _this.props.prepareForm(e.target.name, e.target.value);

            if (e.target.value !== "") {
                errors = _this.props.prepareErrors("name", false, true);
            } else errors = _this.props.prepareErrors("name", { message: DefaultErrorMessages.name });

            _this.props.updateFormAndError(form, errors);
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
                                "  ",
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
            if (_this2.props.errors.hasOwnProperty("age")) return;

            if (_this2.props.formState[_this2.prev_layer] == "") _this2.props.changeToPrev();else _this2.props.changeToNext();
        };

        _this2.handleEnter = function (e) {
            if (e.keyCode === 13) _this2.handleOk();
        };

        _this2.numbersOnly = function () {
            var errors = _this2.props.prepareErrors("age", { message: DefaultErrorMessages.numbers_only });
            _this2.props.updateFormAndError(_this2.props.formState, errors);
            var layer = document.querySelector("." + CSSClasses.age_event_layer);
            layer.classList.add(CSSClasses.warning_shake);

            setTimeout(function () {
                layer.classList.remove(CSSClasses.warning_shake);
            }, SymbolicConstants.shake_timeout);
        };

        _this2.handleInput = function (e) {
            if (isNaN(e.target.value)) {
                e.target.value = '';
                return _this2.numbersOnly();
            }

            var errors = void 0;
            var form = _this2.props.prepareForm(e.target.name, e.target.value);

            if (e.target.value !== "" && (e.target.value <= SymbolicConstants.min_age || e.target.value > SymbolicConstants.max_age)) {
                errors = _this2.props.prepareErrors(CSSClasses.age, { message: DefaultErrorMessages.age_out_of_rage });
            } else if (e.target.value !== "") {
                errors = _this2.props.prepareErrors(CSSClasses.age, false, true);
            } else errors = _this2.props.prepareErrors(CSSClasses.age, { message: DefaultErrorMessages.age_required });

            _this2.props.updateFormAndError(form, errors);
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
                    "  ",
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
                    "  ",
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
                    { className: "event_layer age_event_layer" },
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

            if (_this3.props.errors.hasOwnProperty(CSSClasses.location)) return;

            if (_this3.props.formState[_this3.prev_layer] == "") _this3.props.changeToPrev();else _this3.props.changeToNext();
        };

        _this3.handleEnter = function (e) {
            if (e.keyCode === 13) // Enter is pressed.
                _this3.handleOk();
        };

        _this3.handleInput = function (e) {
            var errors = void 0;
            var form = _this3.props.prepareForm(e.target.name, e.target.value);

            if (e.target.value !== "") {
                errors = _this3.props.prepareErrors(CSSClasses.location, false, true);
            } else errors = _this3.props.prepareErrors(CSSClasses.location, { message: DefaultErrorMessages.location_required });

            _this3.props.updateFormAndError(form, errors);
        };

        _this3.validateInput = function () {
            if (_this3.props.formState.location !== "") return true;
            return false;
        };

        _this3.hintOrAction = function (field) {
            var isValid = _this3.validateInput();
            if (_this3.props.errors.hasOwnProperty(field)) return React.createElement(ErrorMessage, { errors: _this3.props.errors, field: field });

            return React.createElement(RegularButton, { errors: _this3.props.errors, isValid: isValid, formState: _this3.props.formState, handleOk: _this3.handleOk });
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
                    "  ",
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
            // if (this.props.formState.name !== "")
            //     label = (<label className="input_label" htmlFor="date_of_birth">
            //         <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, where do you <strong>live</strong>?</span></label>);

            var validityElement = this.hintOrAction(CSSClasses.location);

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
                        React.createElement("input", { onChange: this.handleInput, onKeyUp: this.handleEnter, className: "raw_input",
                            name: "location", id: "location", type: "text", defaultValue: this.props.formState.location, placeholder: "Type your answer here..." }),
                        validityElement
                    )
                )
            );
        }
    }]);

    return Location;
}(React.Component);

var Email = function (_React$Component4) {
    _inherits(Email, _React$Component4);

    function Email(props) {
        _classCallCheck(this, Email);

        var _this4 = _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, props));

        _this4.handleOk = function () {
            // Validation goes here.

            // if (this.props.errors.hasOwnProperty(CSSClasses.email)) return;

            if (_this4.props.formState[_this4.prev_layer] == "") _this4.props.changeToPrev();else _this4.props.changeToNext();
        };

        _this4.handleEnter = function (e) {
            if (e.keyCode === 13) // Enter is pressed.
                _this4.handleOk();
        };

        _this4.handleInput = function (e) {
            var errors = void 0;
            var form = _this4.props.prepareForm(e.target.name, e.target.value);

            // Check email format here.
            if (e.target.value !== "" && !validateEmail(e.target.value)) {
                errors = _this4.props.prepareErrors(CSSClasses.email, { message: DefaultErrorMessages.email_wrong_format });
            } else {
                errors = _this4.props.prepareErrors(CSSClasses.email, false, true);
            }

            _this4.props.updateFormAndError(form, errors);
        };

        _this4.validateInput = function () {
            if (_this4.props.formState.email !== "") return true;
            return false;
        };

        _this4.hintOrAction = function (field) {
            var isValid = _this4.validateInput();
            if (_this4.props.errors.hasOwnProperty(field)) return React.createElement(ErrorMessage, { errors: _this4.props.errors, field: field });

            return React.createElement(RegularButton, { errors: _this4.props.errors, isValid: isValid, formState: _this4.props.formState, handleOk: _this4.handleOk });
        };

        _this4.prev_layer = CSSClasses.location;
        return _this4;
    }

    _createClass(Email, [{
        key: "render",
        value: function render() {
            var label = React.createElement(
                "label",
                { className: "input_label", htmlFor: "email" },
                React.createElement(
                    "span",
                    { className: "question_number" },
                    "  ",
                    this.props.svgArrow
                ),
                React.createElement(
                    "span",
                    null,
                    "What is your ",
                    React.createElement(
                        "strong",
                        null,
                        "email"
                    ),
                    " address?"
                )
            );
            // if (this.props.formState.name !== "")
            //     label = (<label className="input_label" htmlFor="email">
            //         <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, what is your <strong>email</strong> address?</span></label>);

            var validityElement = this.hintOrAction(CSSClasses.email);

            return React.createElement(
                "section",
                { className: "user_email form_layer" },
                React.createElement(
                    "div",
                    { className: "layer_content" },
                    React.createElement(
                        "div",
                        { className: "questions" },
                        label,
                        React.createElement(
                            "div",
                            { className: "question_usage_hint" },
                            "This is ",
                            React.createElement(
                                "strong",
                                null,
                                "optional"
                            ),
                            "."
                        ),
                        React.createElement("input", { onChange: this.handleInput, onKeyUp: this.handleEnter, className: "raw_input",
                            name: "email", id: "email", type: "text", defaultValue: this.props.formState.email, placeholder: "example@mail.tld" }),
                        validityElement
                    )
                )
            );
        }
    }]);

    return Email;
}(React.Component);

export { Name, Age, Location, Email };