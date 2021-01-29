import {RegularButton} from "./helper_components";

class DateOfInjury extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let label = (<label className="input_label" htmlFor="injury_date">
            <span className="question_number">4 {this.props.svgArrow}</span><strong>When was</strong> your brain injury?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_date">
                <span className="question_number">4 {this.props.svgArrow}</span>{this.props.formState.name}, <strong>when was</strong> your brain injury??</label>);


        return (
            <section className="date_of_injury form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <div className="date_input_section">
                            <div className="date_input_part date_input_part_dash date_input_month">
                                <label className="date_section_name">Month</label>
                                <input className="raw_date_input" type="text"/>
                            </div>
                            <div className="date_input_part date_input_part_dash date_input_day">
                                <label className="date_section_name">Day</label>
                                <input className="raw_date_input" type="text"/>
                            </div>
                            <div className="date_input_part date_input_year">
                                <label className="date_section_name">Year</label>
                                <input className="raw_date_input" type="text"/>
                            </div>
                        </div>
                        <RegularButton/>
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
        let label = (<label className="input_label" htmlFor="injury_reason">
            <span className="question_number">5 {this.props.svgArrow}</span>What was <strong>the cause</strong> of injury?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_reason">
                <span className="question_number">5 {this.props.svgArrow}</span>{this.props.formState.name}, what was <strong>the cause</strong> of injury?</label>);

        return (
            <section className="cause_of_injury form_layer hidden">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} className="raw_input"
                               name="injury_reason" id="injury_reason" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                        <RegularButton/>
                    </div>
                </div>
            </section>
        )
    }
}


export {DateOfInjury, CauseOfInjury};