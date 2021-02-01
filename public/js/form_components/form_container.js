var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Name, Age, Location, Email } from "./demo_layer";
import { DateOfInjury, CauseOfInjury } from "./injury_layer";
import { Concerns } from "./concerns_layer";
import { Navigation } from "./navigation_buttons";
import { ProgressBar } from "./progress_bar";
import { CSSClasses, DefaultErrorMessages, SymbolicConstants, validateEmail } from "./helper_components";

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.updateStorage = function () {
            window.localStorage.setItem("form", JSON.stringify(_this.state));
        };

        _this.storageContentIsValid = function (storageData) {
            if (storageData === "undefined" || storageData == "null" || storageData == null) return false;
            // Required field existence checking.
            var parsedData = JSON.parse(storageData);
            if (!parsedData.hasOwnProperty("navigation") || !parsedData.hasOwnProperty("form") || !parsedData.hasOwnProperty("errors")) return false;

            return true; // Valid.
        };

        _this.populateState = function () {
            var defaultState = {
                navigation: {
                    current_position: 0,
                    max_number_of_pages: SymbolicConstants.max_number_of_pages
                },

                form: {
                    name: "",
                    age: "",
                    email: "",
                    location: "",
                    concerns: [],
                    solid_concern: "",
                    concerns_other: "",
                    injury_date_day: "",
                    injury_date_month: "",
                    injury_date_year: "",
                    injury_reason: ""
                },

                errors: {}
            };

            var state = window.localStorage.getItem("form");
            if (_this.storageContentIsValid(state)) {
                state = JSON.parse(state);
                // Don't remember position of page
                state.navigation.current_position = 0;

                return state;
            }

            return defaultState;
        };

        _this.submit = function () {
            console.log("submit is called");
        };

        _this.onChange = function (field, value) {
            var items = Object.assign({}, _this.state);
            var form = Object.assign({}, _this.state.form);
            var errors = Object.assign({}, _this.state.errors);
            var navigation = Object.assign({}, _this.state.navigation);
            form[field] = value;

            items.errors = errors;
            items.form = form;
            items.navigation = navigation;
            _this.setState(items);
        };

        _this.onCheckboxCheck = function (field, value) {
            _this.onChange(field, value);
        };

        _this.prepareErrors = function (field, value) {
            var deleteEnt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var errors = Object.assign({}, _this.state.errors);
            var navigation = Object.assign({}, _this.state.navigation);
            if (deleteEnt) delete errors[field];else errors[field] = value;

            return errors;
        };

        _this.prepareForm = function (field, value) {
            var form = Object.assign({}, _this.state.form);
            form[field] = value;
            return form;
        };

        _this.updateFormAndError = function (formObj, errorsObj) {
            var items = Object.assign({}, _this.state);

            items.errors = errorsObj;
            items.form = formObj;

            _this.setState(items);
        };

        _this.onValueChange = function (event) {
            var field = event.target.name;
            var value = event.target.value;
            _this.onChange(field, value);
        };

        _this.onErrorChange = function (field, value) {
            var deleteEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var items = Object.assign({}, _this.state);
            var form = Object.assign({}, _this.state.form);
            var errors = Object.assign({}, _this.state.errors);
            var navigation = Object.assign({}, _this.state.navigation);
            if (deleteEl) delete errors[field];else errors[field] = value;

            items.errors = errors;
            items.form = form;
            items.navigation = navigation;
            _this.setState(items);
        };

        _this.updateNavigation = function (field, value) {
            var items = Object.assign({}, _this.state);
            var form = Object.assign({}, _this.state.form);
            var errors = Object.assign({}, _this.state.errors);
            var navigation = Object.assign({}, _this.state.navigation);
            navigation[field] = value;

            items.errors = errors;
            items.form = form;
            items.navigation = navigation;
            _this.setState(items);
        };

        _this.changeToNextLayer = function () {
            if (_this.state.navigation.current_position === _this.state.navigation.max_number_of_pages) return;

            var currentPosition = _this.state.navigation.current_position + 1;
            _this.updateNavigation("current_position", _this.state.navigation.current_position + 1);

            var layers = document.querySelectorAll("." + CSSClasses.form_layer);
            for (var i = 0; i < layers.length; i++) {
                layers[i].style.setProperty("transform", "" + ("translateY(calc(" + currentPosition + "*-" + SymbolicConstants.page_translation_percent + "vh))"));
            }
        };

        _this.changeToPrevLayer = function () {
            if (_this.state.navigation.current_position === 0) return;

            var currentPosition = _this.state.navigation.current_position - 1;
            _this.updateNavigation("current_position", _this.state.navigation.current_position - 1);

            var layers = document.querySelectorAll("." + CSSClasses.form_layer);
            for (var i = 0; i < layers.length; i++) {
                layers[i].style.setProperty("transform", "" + ("translateY(" + ((currentPosition + 1) * -SymbolicConstants.page_translation_percent + SymbolicConstants.page_translation_percent) + "vh)"));
            }
        };

        _this.isValidDate = function (form) {
            return !(form[CSSClasses.injury_date_month] < SymbolicConstants.month_min || form[CSSClasses.injury_date_month] > SymbolicConstants.month_max) && !(form[CSSClasses.injury_date_day] < SymbolicConstants.day_min || form[CSSClasses.injury_date_day] > SymbolicConstants.day_max) && !(form[CSSClasses.injury_date_year] < SymbolicConstants.year_min || form[CSSClasses.injury_date_year] > SymbolicConstants.year_max);
        };

        _this.stringValues = function (field) {
            return !(_this.state.form[field] == "");
        };

        _this.areConcernsValid = function () {
            return !(
            // There is no element in 'concerns' array and 'concerns_other' string is empty.
            _this.state.form.concerns.length < SymbolicConstants.min_amount_of_choices && _this.state.form.concerns_other.length < SymbolicConstants.min_length_of_other_concern ||
            // Concerns have error.
            _this.state.errors.hasOwnProperty(CSSClasses.concerns));
        };

        _this.progressComputation = function () {
            var progress = 0;
            var progressStep = Math.ceil(SymbolicConstants.completed_progress / SymbolicConstants.max_number_of_pages_human);

            progress += !_this.stringValues(CSSClasses.name) ? 0 : progressStep;
            progress += !_this.stringValues(CSSClasses.age) ? 0 : progressStep;
            progress += !_this.stringValues(CSSClasses.location) ? 0 : progressStep;
            progress += !validateEmail(_this.state.form.email) ? 0 : progressStep;
            progress += !_this.stringValues(CSSClasses.injury_reason) ? 0 : progressStep;
            progress += !_this.isValidDate(_this.state.form) ? 0 : progressStep;
            progress += !_this.areConcernsValid() ? 0 : progressStep;

            return progress;
        };

        _this.state = _this.populateState();

        // Event bindings.
        _this.handler = _this.onValueChange.bind(_this);
        _this.checkboxHandler = _this.onCheckboxCheck.bind(_this);
        _this.onValueUpdate = _this.onChange.bind(_this);
        _this.onError = _this.onErrorChange.bind(_this);
        _this.prepareErrors_b = _this.prepareErrors.bind(_this);
        _this.prepareForm_b = _this.prepareForm.bind(_this);
        _this.updateFormAndError_b = _this.updateFormAndError.bind(_this);
        _this.isValidDate_b = _this.isValidDate.bind(_this);
        _this.progressComputation_b = _this.progressComputation.bind(_this);

        // Send request to server via Ajax.
        _this.submit_b = _this.submit.bind(_this);

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

    // Handle submit button press.


    // VALIDATION


    // PROGRESS COMPUTATION


    _createClass(Form, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "layers_container" },
                React.createElement(ProgressBar, { progressComputation: this.progressComputation_b, errors: this.state.errors,
                    formState: this.state.form, isValidDate: this.isValidDate_b }),
                React.createElement(Name, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, errors: this.state.errors,
                    prepareErrors: this.prepareErrors_b, prepareForm: this.prepareForm_b, updateFormAndError: this.updateFormAndError_b }),
                React.createElement(Age, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors,
                    prepareErrors: this.prepareErrors_b, prepareForm: this.prepareForm_b, updateFormAndError: this.updateFormAndError_b }),
                React.createElement(Location, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors,
                    prepareErrors: this.prepareErrors_b, prepareForm: this.prepareForm_b, updateFormAndError: this.updateFormAndError_b }),
                React.createElement(Email, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors,
                    prepareErrors: this.prepareErrors_b, prepareForm: this.prepareForm_b, updateFormAndError: this.updateFormAndError_b }),
                React.createElement(DateOfInjury, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors,
                    prepareErrors: this.prepareErrors_b, prepareForm: this.prepareForm_b, updateFormAndError: this.updateFormAndError_b,
                    isValidDate: this.isValidDate_b }),
                React.createElement(CauseOfInjury, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    checkboxHandler: this.checkboxHandler, onValueUpdate: this.onValueUpdate,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors,
                    prepareErrors: this.prepareErrors_b, prepareForm: this.prepareForm_b, updateFormAndError: this.updateFormAndError_b,
                    isValidDate: this.isValidDate_b }),
                React.createElement(Concerns, { svgArrow: this.svgArrow, handler: this.handler, formState: this.state.form,
                    checkboxHandler: this.checkboxHandler, onValueUpdate: this.onValueUpdate,
                    changeToNext: this.changeToNext, changeToPrev: this.changeToPrev, errors: this.state.errors,
                    prepareErrors: this.prepareErrors_b, prepareForm: this.prepareForm_b, updateFormAndError: this.updateFormAndError_b }),
                React.createElement(Navigation, { submit: this.submit_b, navigation: this.state.navigation, progressComputation: this.progressComputation_b, changeToNext: this.changeToNext,
                    changeToPrev: this.changeToPrev })
            );
        }
    }]);

    return Form;
}(React.Component);

var domContainer = document.querySelector("#form_container");
ReactDOM.render(React.createElement(Form, null), domContainer);