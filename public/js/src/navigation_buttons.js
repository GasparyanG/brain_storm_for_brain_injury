import {CSSClasses} from "./helper_components";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current_position: 0,
            max_number_of_pages: 5
        }
    }

    changeToPrevLayer = () => {
        if (this.state.current_position === 0)
            return;
        else
            this.state.current_position--;

        const layers = document.querySelectorAll("." + CSSClasses.form_layer);
        for(let i = 0; i < layers.length; i++) {
            layers[i].style.setProperty("transform", `${"translateY("  + (((this.state.current_position + 1) * -100) + 100) + "vh)"}`);
        }
    }

    changeToNextLayer = () => {
        if (this.state.current_position === this.state.max_number_of_pages)
            return;
        else
            this.state.current_position++;

        const layers = document.querySelectorAll("." + CSSClasses.form_layer);
        for(let i = 0; i < layers.length; i++) {
            layers[i].style.setProperty("transform", `${"translateY(calc("  + this.state.current_position + "*-100vh))"}`);
        }
    }

    render() {
        return (
            <div className="navigation_buttons">
                <div onClick={this.changeToPrevLayer} className="nav_btn navigation_to_prev">
                    <span className="nav-icon">
                        <svg height="9" width="14"><path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path></svg>
                    </span>
                </div>
                <div onClick={this.changeToNextLayer} className="nav_btn navigation_to_next">
                    <span className="nav-icon">
                        <svg height="9" width="14"><path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path></svg>
                    </span>
                </div>
            </div>
        );
    }
}

export {Navigation};