import {CSSClasses, validateEmail, SymbolicConstants} from "./helper_components";

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Compute progress here.
        let progress = this.props.progressComputation();

        let progressHintContent = "progress " + progress + "%";
        if (progress >= SymbolicConstants.completed_progress)
            progressHintContent = "completed ✓";

       return (
           <div className="form_progress_section">
               <a href="/" className="close_form">
                   &times;
               </a>
               <div className="form_progress_indicator" style={{width: `${progress}%`}}>
               </div>
               <div className="form_progress_amount">
                   {progressHintContent}
               </div>
           </div>
       )
    }
}

export {ProgressBar};