var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { DemographicLayer } from "./demo_layer";
import { InjuryIdentifier } from "./injury_layer";
import { Concerns } from "./concerns_layer";

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.updateStorage = function () {
            window.localStorage.setItem("form", JSON.stringify(_this.state));
        };

        _this.handleClick = function () {
            _this.setState(_this.state = {
                liked: true
            });
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

        _this.state = _this.populateState();
        _this.handler = _this.onValueChange.bind(_this);

        // Update local storage periodically.
        setInterval(_this.updateStorage, 30000);
        return _this;
    }

    _createClass(Form, [{
        key: "populateState",
        value: function populateState() {
            var defaultState = {
                liked: false,
                form: {
                    name: "",
                    age: "",
                    location: ""
                }
            };

            var state = window.localStorage.getItem("form");
            if (state !== "undefined" && state !== "null") return JSON.parse(state);
            return defaultState;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.liked) {
                return React.createElement(
                    "div",
                    { className: "layers_container" },
                    React.createElement(DemographicLayer, { handler: this.handler, formState: this.state.form }),
                    React.createElement(InjuryIdentifier, { handler: this.handler, formState: this.state.form }),
                    React.createElement(Concerns, { handler: this.handler, formState: this.state.form })
                );
            }

            return React.createElement(
                "button",
                { onClick: this.handleClick },
                "Like"
            );
        }
    }]);

    return Form;
}(React.Component);

var domContainer = document.querySelector("#form_container");
ReactDOM.render(React.createElement(Form, null), domContainer);