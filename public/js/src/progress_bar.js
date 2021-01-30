import {SymbolicConstants} from "./helper_components";

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    dateProgress = () => {
        return !(
            this.props.formState.injury_date_day == ""
            || this.props.formState.injury_date_month == ""
            || this.props.formState.injury_date_year == ""
        );
    }

    stringValues = (field) => {
        return !(this.props.formState[field] == "");
    }

    render() {
       // Compute progress here.
        let progress = 0;
        let progressStep = Math.ceil(SymbolicConstants.completed_progress/SymbolicConstants.max_number_of_pages);

        progress += !this.stringValues("name") ? 0 : progressStep;
        progress += !this.stringValues("age") ? 0 : progressStep;
        progress += !this.stringValues("location") ? 0 : progressStep;
        progress += !this.dateProgress() ? 0 : progressStep;
        progress += !this.stringValues("location") ? 0 : progressStep;
        progress += this.props.formState.concerns.length === 0 ? 0 : progressStep;

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