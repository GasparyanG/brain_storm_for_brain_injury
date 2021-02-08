var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses, validateEmail, SymbolicConstants } from "./helper_components";

var ProgressBar = function (_React$Component) {
    _inherits(ProgressBar, _React$Component);

    function ProgressBar(props) {
        _classCallCheck(this, ProgressBar);

        return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));
    }

    _createClass(ProgressBar, [{
        key: "render",
        value: function render() {
            // Compute progress here.
            var progress = this.props.progressComputation();

            var progressHintContent = "progress " + progress + "%";
            if (progress >= SymbolicConstants.completed_progress) progressHintContent = "completed ✓";

            return React.createElement(
                "div",
                { className: "form_progress_section" },
                React.createElement(
                    "a",
                    { href: "/", className: "close_form", title: "Quite the form." },
                    "\xD7"
                ),
                React.createElement("div", { className: "form_progress_indicator", style: { width: progress + "%" } }),
                React.createElement(
                    "div",
                    { className: "form_progress_amount" },
                    progressHintContent
                )
            );
        }
    }]);

    return ProgressBar;
}(React.Component);

export { ProgressBar };