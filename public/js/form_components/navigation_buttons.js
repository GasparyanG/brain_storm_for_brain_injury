var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { CSSClasses, debounce, SymbolicConstants } from "./helper_components";

var Navigation = function (_React$Component) {
    _inherits(Navigation, _React$Component);

    function Navigation(props) {
        _classCallCheck(this, Navigation);

        var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

        _this.handleOnScroll = function (e) {
            var evt = window.event || e; //equalize event object
            var delta = evt.detail ? evt.detail * SymbolicConstants.scroll_delta : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta

            if (delta < 0) _this.props.changeToNext();else _this.props.changeToPrev();
        };

        _this.addOnScroll = function () {
            var scrollHandler = debounce(_this.handleOnScroll, SymbolicConstants.debounce_wait);

            // IE9, Chrome, Safari, Opera
            document.body.addEventListener("mousewheel", scrollHandler);
            // Firefox
            document.body.addEventListener("DOMMouseScroll", scrollHandler);
        };

        _this.addOnScroll();
        return _this;
    }

    _createClass(Navigation, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "navigation_buttons" },
                React.createElement(
                    "div",
                    { onClick: this.props.changeToPrev, className: "nav_btn navigation_to_prev" },
                    React.createElement(
                        "span",
                        { className: "nav-icon" },
                        React.createElement(
                            "svg",
                            { height: "9", width: "14" },
                            React.createElement("path", { d: "M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z" })
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { onClick: this.props.changeToNext, className: "nav_btn navigation_to_next" },
                    React.createElement(
                        "span",
                        { className: "nav-icon" },
                        React.createElement(
                            "svg",
                            { height: "9", width: "14" },
                            React.createElement("path", { d: "M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z" })
                        )
                    )
                )
            );
        }
    }]);

    return Navigation;
}(React.Component);

export { Navigation };