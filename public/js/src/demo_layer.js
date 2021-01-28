class DemographicLayer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let svgArrow = (<svg height="10" width="11"><path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path><path d="M8 4v2H0V4z"></path></svg>);

        return (
            <section className="demographic_information form_layer">
                <div className="layer_content">
                    <div className="layer_header">Hi, tell me about you a little bit.</div>
                    <div className="questions">
                        <label className="input_label" htmlFor="name"><span className="question_number">1 {svgArrow}</span>What is your <strong>name</strong>?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="name" id="name" type="text" defaultValue={this.props.formState.name} placeholder="Type your answer here..."/>
                        <label className="input_label" htmlFor="date_of_birth"><span className="question_number">2 {svgArrow}</span>When did you <strong>born</strong>?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="date_of_birth" id="date_of_birth" type="text" defaultValue={this.props.formState.age} placeholder="Type your answer here..."/>
                        <label className="input_label" htmlFor="location"><span className="question_number">3 {svgArrow}</span>Where do you <strong>live</strong>?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="location" id="location" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                    </div>
                </div>
            </section>
        )
    }
}

export {DemographicLayer};