import {RegularButton} from "./helper_components";

class Name extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="user_name form_layer">
                <div className="layer_content">
                    <div className="questions">
                        <label className="input_label" htmlFor="name"><span className="question_number">1 {this.props.svgArrow}</span>Let's start with your <strong>name</strong>.</label>
                        <input onChange={this.props.handler} className="raw_input"
                               name="name" id="name" type="text" defaultValue={this.props.formState.name} placeholder="Type here..."/>
                        <RegularButton/>
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
        let label = (<label className="input_label" htmlFor="age"><span className="question_number">2 {this.props.svgArrow}</span>How <strong>old</strong> are you?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="age"><span className="question_number">2 {this.props.svgArrow}</span>{this.props.formState.name}, how <strong>old</strong> are you?</label>);

        return (
            <section className="user_age form_layer hidden">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} className="raw_input"
                               name="age" id="age" type="text" defaultValue={this.props.formState.age} placeholder="Type your answer here..."/>
                        <RegularButton/>
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
        let label = (<label className="input_label" htmlFor="date_of_birth">
            <span className="question_number">2 {this.props.svgArrow}</span>Where do you <strong>live</strong>?</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="date_of_birth">
                <span className="question_number">2 {this.props.svgArrow}</span>{this.props.formState.name}, where do you <strong>live</strong>?</label>);

        return (
            <section className="user_location form_layer hidden">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} className="raw_input"
                               name="location" id="location" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                        <RegularButton/>
                    </div>
                </div>
            </section>
        );
    }
}

export {Name, Age, Location};