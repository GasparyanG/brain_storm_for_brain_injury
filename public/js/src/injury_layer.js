class InjuryIdentifier extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let svgArrow = (<svg height="10" width="11"><path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path><path d="M8 4v2H0V4z"></path></svg>);

        return (
            <section className="injury_identification form_layer">
                <div className="layer_content">
                    <div className="layer_header">Now, let's fill some information about your injury.</div>
                    <div className="questions">
                        <label className="input_label" htmlFor="injury_date"><span className="question_number">4 {svgArrow}</span><strong>When was</strong> your brain injury?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="injury_date" id="injury_date" type="text" defaultValue={this.props.formState.injury_date} placeholder="Type your answer here..."/>
                        <label className="input_label" htmlFor="injury_cause"><span className="question_number">5 {svgArrow}</span>What was <strong>the cause</strong> of injury?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="injury_cause" id="injury_cause" type="text" defaultValue={this.props.formState.injury_reason} placeholder="Type your answer here..."/>
                    </div>
                </div>
            </section>
        )
    }
}

export {InjuryIdentifier};