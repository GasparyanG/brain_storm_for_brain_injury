class Name extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="user_name form_layer">
                <div className="layer_content">
                    <div className="questions">
                        <label className="input_label" htmlFor="name"><span className="question_number">1 {this.props.svgArrow}</span>Let's start with your name</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="name" id="name" type="text" defaultValue={this.props.formState.name} placeholder="Type your answer here..."/>
                        <div className="action_box">
                            <input className="raw_button" type="button" value="OK"/>
                            <span className="action_prompt">
                                <span className="prompt_part pp_press">press</span>
                                <span className="prompt_part pp_enter">Enter ↵</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class Age extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="user_age form_layer hidden">
                <div className="layer_content">
                    <div className="questions">
                        <label className="input_label" htmlFor="date_of_birth"><span className="question_number">2 {this.props.svgArrow}</span>When did you <strong>born</strong>?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="date_of_birth" id="date_of_birth" type="text" defaultValue={this.props.formState.age} placeholder="Type your answer here..."/>
                    </div>
                </div>
            </section>
        );
    }
}


class Location extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="user_location form_layer hidden">
                <div className="layer_content">
                    <div className="questions">
                        <label className="input_label" htmlFor="location"><span className="question_number">3 {this.props.svgArrow}</span>Where do you <strong>live</strong>?</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="location" id="location" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                    </div>
                </div>
            </section>
        );
    }
}

export {Name, Age, Location};