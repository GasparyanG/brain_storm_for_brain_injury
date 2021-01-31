import {CSSClasses, validateEmail, SymbolicConstants} from "./helper_components";

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    stringValues = (field) => {
        return !(this.props.formState[field] == "");
    }

    areConcernsValid = () => {
        return !(
            // There is no element in 'concerns' array and 'concerns_other' string is empty.
            ((this.props.formState.concerns.length < SymbolicConstants.min_amount_of_choices)
                && (this.props.formState.concerns_other.length < SymbolicConstants.min_length_of_other_concern))
            // Concerns have error.
            || this.props.errors.hasOwnProperty(CSSClasses.concerns)
        );
    }

    progressComputation = () => {
        let progress = 0;
        let progressStep =
            Math.ceil(SymbolicConstants.completed_progress/SymbolicConstants.max_number_of_pages_human);

        progress += !this.stringValues(CSSClasses.name) ? 0 : progressStep;
        progress += !this.stringValues(CSSClasses.age) ? 0 : progressStep;
        progress += !this.stringValues(CSSClasses.location) ? 0 : progressStep;
        progress += !validateEmail(this.props.formState.email) ? 0 : progressStep;
        progress += !this.stringValues(CSSClasses.injury_reason) ? 0 : progressStep;
        progress += !this.props.isValidDate(this.props.formState) ? 0 : progressStep;
        progress += !this.areConcernsValid() ? 0 : progressStep;

        return progress;
    }

    render() {
       // Compute progress here.
        let progress = this.progressComputation();

        let progressHintContent = "progress " + progress + "%";
        if (progress >= SymbolicConstants.completed_progress)
            progressHintContent = "completed ✓";

       return (
           <div className="form_progress_section">
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