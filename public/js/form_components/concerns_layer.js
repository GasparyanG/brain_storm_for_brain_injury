var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Concerns = function (_React$Component) {
    _inherits(Concerns, _React$Component);

    function Concerns(props) {
        _classCallCheck(this, Concerns);

        var _this = _possibleConstructorReturn(this, (Concerns.__proto__ || Object.getPrototypeOf(Concerns)).call(this, props));

        _this.onCheck = function (e) {
            var concerns = [].concat(_toConsumableArray(_this.props.formState.concerns));
            if (concerns.includes(e.target.dataset.value)) {
                var index = concerns.indexOf(e.target.dataset.value);
                if (index > -1) {
                    concerns.splice(index, 1);
                }
            } else {
                concerns.push(e.target.dataset.value);
            }

            console.log(concerns);

            _this.props.checkboxHandler("concerns", concerns);
        };

        _this.state = {
            concerns: {
                1: "Headaches", 2: "Pain", 3: "Fatigue",
                4: "Balance difficulties", 5: "Dizziness", 6: "Vision problems",
                7: "Hearing problems", 8: "Light or sound sensitivity", 9: "Trouble sleeping",
                10: "Thinking difficulties", 11: "Speaking or understanding difficulties", 12: "Mood difficulties",
                13: "Depression or anxiety"
            }
        };
        return _this;
    }

    _createClass(Concerns, [{
        key: "createCheckbox",
        value: function createCheckbox(key) {
            var value = this.state.concerns[key];

            var checked = this.props.formState.concerns.includes(key) ? "checked" : "";
            var checkbox = React.createElement("input", { onChange: this.onCheck, className: "checkbox_input", type: "checkbox",
                id: "c_" + key, name: "c_" + key, "data-value": key, value: value });
            if (checked === "checked") checkbox = React.createElement("input", { onChange: this.onCheck, className: "checkbox_input", type: "checkbox",
                id: "c_" + key, name: "c_" + key, "data-value": key, value: value, checked: true });

            return React.createElement(
                "div",
                { key: value + "_" + key },
                checkbox,
                React.createElement(
                    "label",
                    { className: "checkbox_label", htmlFor: "c_" + key },
                    " ",
                    value
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var svgArrow = React.createElement(
                "svg",
                { height: "10", width: "11" },
                React.createElement("path", { d: "M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z" }),
                React.createElement("path", { d: "M8 4v2H0V4z" })
            );

            // Prepare Checkbox array
            var checkboxItems = [];
            for (var key in this.state.concerns) {
                checkboxItems.push(this.createCheckbox(key));
            }

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
                                "6 ",
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
                            checkboxItems,
                            React.createElement("input", { onChange: this.props.handler, className: "raw_input",
                                name: "concerns_other", id: "concerns_other", type: "text", defaultValue: this.props.formState.concerns_other, placeholder: "Other" })
                        )
                    )
                )
            );
        }
    }]);

    return Concerns;
}(React.Component);

export { Concerns };