class DemographicLayer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="demographic_information form_layer">
                <h1 className="layer_header">Hi, tell me about you a little bit.</h1>
                <div className="questions">
                    <label htmlFor="name"><span className="question_number">1 -></span>What is your <strong>name</strong>?</label>
                    <input onChange={this.props.handler} className="raw_input"
                           name="name" id="name" type="text" defaultValue={this.props.formState.name}/>
                    <label htmlFor="age"><span className="question_number">2 -></span>When did you born?</label>
                    <input onChange={this.props.handler} className="raw_input"
                           name="age" id="age" type="text" defaultValue={this.props.formState.age}/>
                    <label htmlFor="location"><span className="question_number">3 -></span>Where do you live?</label>
                    <input onChange={this.props.handler} className="raw_input"
                           name="location" id="location" type="text" defaultValue={this.props.formState.location}/>
                </div>
            </section>
        )
    }
}

export {DemographicLayer};