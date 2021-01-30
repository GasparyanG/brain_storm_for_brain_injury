var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Name, Age, Location } from "./demo_layer";
import { DateOfInjury, CauseOfInjury } from "./injury_layer";
import { Concerns } from "./concerns_layer";
import { Navigation } from "./navigation_buttons";
import { ProgressBar } from "./progress_bar";
import { CSSClasses, DefaultErrorMessages, SymbolicConstants } from "./helper_components";

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.updateStorage = function () {
            window.localStorage.setItem("form", JSON.stringify(_this.state));
        };

        _this.onCheckboxCheck = function (field, value) {
            _this.onChange(field, value);
        };

        _this.onValueChange = function (event) {
            var field = event.target.name;
            var value = event.target.value;
            _this.onChange(field, value);
        };

        _this.onChange = function (field, value) {
            var items = Object.assign({}, _this.state);
            var form = Object.assign({}, _this.state.form);
            form[field] = value;

            items.form = form;
            _this.setState(items);
        };

        _this.changeToNextLayer = function () {
            if (_this.state.navigation.current_position === _this.state.navigation.max_number_of_pages) return;else _this.state.navigation.current_position++;

            var layers = document.querySelectorAll("." + CSSClasses.form_layer);
            for (var i = 0; i < layers.length; i++) {
                layers[i].style.setProperty("transform", "" + ("translateY(calc(" + _this.state.navigation.current_position + "*-" + SymbolicConstants.page_translation_percent + "vh))"));
            }
        };

        _this.changeToPrevLayer = function () {
            if (_this.state.navigation.current_position === 0) return;else _this.state.navigation.current_position--;

            var layers = document.querySelectorAll("." + CSSClasses.form_layer);
            for (var i = 0; i < layers.length; i++) {
                layers[i].style.setProperty("transform", "" + ("translateY(" + ((_this.state.navigation.current_position + 1) * -SymbolicConstants.page_translation_percent + SymbolicConstants.page_translation_percent) + "vh)"));
            }
        };

        _this.state = _this.populateState();

        // Event bindings.
        _this.handler = _this.onValueChange.bind(_this);
        _this.checkboxHandler = _this.onCheckboxCheck.bind(_this);
        _this.onValueUpdate = _this.onChange.bind(_this);

        // Navigation
        _this.changeToNext = _this.changeToNextLayer.bind(_this);
        _this.changeToPrev = _this.changeToPrevLayer.bind(_this);

        // Common Components
        _this.svgArrow = React.createElement(
            "svg",
            { height: "10", width: "11" },
            React.createElement("path", { d: "M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z" }),
            React.createElement("path", { d: "M8 4v2H0V4z" })
        );

        // Update local storage periodically.
        setInterval(_this.updateStorage, SymbolicConstants.local_storage_update_timout);
        return _this;
    }

    _createClass(Form, [{
        key: "populateState",
        value: function populateState() {
            var defaultState = {
                navigation: {
                    current_position: 0,
                    max_number_of_pages: SymbolicConstants.max_number_of_pages
                },

                form: {
                    name: "",
                    age: "",
                    location: "",
                    concerns: [],
                    solid_concern: "",
                    concerns_other: "",
                    injury_date_day: "",
                    injury_date_month: "",
                    injury_date_year: "",
                    injury_reason: ""
                },

                errors: {
                    name: {
                        message: DefaultErrorMessages.name
                    }
                }
            };

            var state = window.localStorage.getItem("form");
            if (state !== "undefined" && state !== "null") {
                state = JSON.parse(state);
                // Don't remember postion of page
                state.navigation.current_position = 0;

                return state;
            }
            return defaultState;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "layers_container" },
                React.createElement(ProgressBar, { formState: this.state.form }),
                React.createElement(Name, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, errors: this.state.errors }),
                React.createElement(Age, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors }),
                React.createElement(Location, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors }),
                React.createElement(DateOfInjury, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors }),
                React.createElement(CauseOfInjury, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    checkboxHandler: this.checkboxHandler, onValueUpdate: this.onValueUpdate,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors }),
                React.createElement(Concerns, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    checkboxHandler: this.checkboxHandler, onValueUpdate: this.onValueUpdate,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors }),
                React.createElement(Navigation, { changeToNext: this.changeToNext, changeToPrev: this.changeToPrev })
            );
        }
    }]);

    return Form;
}(React.Component);

var domContainer = document.querySelector("#form_container");
ReactDOM.render(React.createElement(Form, null), domContainer);