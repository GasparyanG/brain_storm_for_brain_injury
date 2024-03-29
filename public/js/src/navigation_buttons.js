import {CSSClasses, debounce, SymbolicConstants, SubmitButton, isBrowser} from "./helper_components";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.addOnScroll();
    }

    handleOnScroll = (e) => {
        let evt = window.event || e;                                  //equalize event object
        let delta = evt.detail? evt.detail*(SymbolicConstants.scroll_delta) : evt.wheelDelta;   //check for detail first so Opera uses that instead of wheelDelta

        if (delta < 0)
            this.props.changeToNext();
        else
            this.props.changeToPrev();
    }

    addOnScroll = () => {
        let scrollHandler = debounce(this.handleOnScroll, SymbolicConstants.debounce_wait);

        // IE9, Chrome, Safari, Opera
        document.body.addEventListener("mousewheel", scrollHandler);
        // Firefox
        document.body.addEventListener("DOMMouseScroll", scrollHandler);
    }

    submitButtonState = () => {
        return <SubmitButton submit={this.props.submit} progress={this.props.progressComputation() >= 100}/>
    }

    render() {
        let submitButton = this.submitButtonState();

        // Layer navigator activation.
        let firstPage = "";
        if (this.props.navigation.current_position === 0) {
            firstPage = CSSClasses.disabled_nav;
        }

        let lastPage = "";
        if (this.props.navigation.current_position === SymbolicConstants.max_number_of_pages) {
            lastPage = CSSClasses.disabled_nav;
        }

        return (
            <div className="navigation_buttons">
                {submitButton}
                <div onClick={this.props.changeToPrev} className={"nav_btn navigation_to_prev " + firstPage } >
                    <span className="nav-icon">
                        <svg height="9" width="14"><path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path></svg>
                    </span>
                </div>
                <div onClick={this.props.changeToNext} className={"nav_btn navigation_to_next " + lastPage }>
                    <span className="nav-icon">
                        <svg height="9" width="14"><path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path></svg>
                    </span>
                </div>
            </div>
        );
    }
}

export {Navigation};