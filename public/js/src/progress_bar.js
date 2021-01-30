class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       // Compute progress here.
        let progress = 50;

       return (
           <div className="form_progress_section">
               <div className="form_progress_indicator" style={{width: `${progress}%`}}>
               </div>
               <div className="form_progress_amount">
                   progress {progress}%
               </div>
           </div>
       )
    }
}

export {ProgressBar};