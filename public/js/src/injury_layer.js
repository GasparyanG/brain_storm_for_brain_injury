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
                                <label htmlFor="injury_date_month" className="date_section_name">Month</label>
                                <input onChange={this.props.handler} id="injury_date_month" name="injury_date_month" className="raw_date_input" type="text"/>
                            </div>
                            <div className="date_input_part date_input_part_dash date_input_day">
                                <label htmlFor="injury_date_day" className="date_section_name">Day</label>
                                <input onChange={this.props.handler} id="injury_date_day" name="injury_date_day" className="raw_date_input" type="text"/>
                            </div>
                            <div className="date_input_part date_input_year">
                                <label htmlFor="injury_date_year" className="date_section_name">Year</label>
                                <input onChange={this.props.handler} id="injury_date_year" name="injury_date_year" className="raw_date_input" type="text"/>
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
                        <div className="choices_section">
                            <div className="choice_part">
                                <div className="choice_letter">A</div>
                                <div className="choice_name">Traumatic brain injury</div>
                            </div>
                            <div className="choice_part">
                                <div className="choice_letter">B</div>
                                <div className="choice_name">Stroke</div>
                            </div>
                            <div className="choice_part">
                                <div className="choice_letter">C</div>
                                <div className="choice_name">Cerebral palsy</div>
                            </div>
                            <div className="choice_part">
                                <div className="choice_letter">D</div>
                                <div className="choice_name">Tumor</div>
                            </div>
                            <div className="choice_part">
                                <div className="choice_letter">E</div>
                                <div className="choice_name">Infection</div>
                            </div>
                            <div className="choice_part">
                                <div className="choice_letter">F</div>
                                <div className="choice_name">
                                    <span>Other</span>
                                    <input className="choice_other_raw_input hidden" type="text" placeholder="Type your answer..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export {DateOfInjury, CauseOfInjury};