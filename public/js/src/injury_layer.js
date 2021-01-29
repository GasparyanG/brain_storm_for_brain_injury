import {RegularButton} from "./helper_components";

class DateOfInjury extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let label = (<label className="input_label" htmlFor="date_of_birth">
            <span className="question_number">2 {this.props.svgArrow}</span><strong>When was</strong> your brain injury?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="date_of_birth">
                <span className="question_number">2 {this.props.svgArrow}</span>{this.props.formState.name}, <strong>when was</strong> your brain injury??</label>);


        return (
            <section className="injury_identification form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} className="raw_input"
                               name="location" id="location" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                        <RegularButton/>
                        <label className="input_label" htmlFor="injury_date"><span className="question_number">4 {svgArrow}</span><strong>When was</strong> your brain injury?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="injury_date" id="injury_date" type="text" defaultValue={this.props.formState.injury_date} placeholder="Type your answer here..."/>
                    </div>
                </div>
            </section>
        )
    }
}

class CauseOfInjury extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let label = (<label className="input_label" htmlFor="date_of_birth">
            <span className="question_number">2 {this.props.svgArrow}</span>Where do you <strong>live</strong>?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="date_of_birth">
                <span className="question_number">2 {this.props.svgArrow}</span>{this.props.formState.name}, where do you <strong>live</strong>?</label>);

        return (
            <section className="injury_identification form_layer">
                <div className="layer_content">
                    <div className="questions">
                        <label className="input_label" htmlFor="injury_cause"><span className="question_number">5 {svgArrow}</span>What was <strong>the cause</strong> of injury?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="injury_cause" id="injury_cause" type="text" defaultValue={this.props.formState.injury_reason} placeholder="Type your answer here..."/>
                    </div>
                </div>
            </section>
        )
    }
}


export {DateOfInjury, CauseOfInjury};