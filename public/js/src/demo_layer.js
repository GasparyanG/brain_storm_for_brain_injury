import {RegularButton} from "./helper_components";

class Name extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOk = () => {
        // Validation goes here.

        this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)
            this.handleOk();
    }

    render() {
        return (
            <section className="user_name form_layer">
                <div className="layer_content">
                    <div className="questions">
                        <label className="input_label" htmlFor="name"><span className="question_number">1 {this.props.svgArrow}</span><span>Let's start with your <strong>name</strong>.</span></label>
                        <input onChange={this.props.handler} onKeyUp={this.handleEnter} className="raw_input"
                               name="name" id="name" type="text" defaultValue={this.props.formState.name} placeholder="Type here..."/>
                        <RegularButton handleOk={this.handleOk}/>
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

    handleOk = () => {
        // Validation goes here.

        this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)
            this.handleOk();
    }

    render() {
        let label = (<label className="input_label" htmlFor="age"><span className="question_number">2 {this.props.svgArrow}</span><span>How <strong>old</strong> are you?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="age"><span className="question_number">2 {this.props.svgArrow}</span><span>{this.props.formState.name}, how <strong>old</strong> are you?</span></label>);

        return (
            <section className="user_age form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} onKeyUp={this.handleEnter} className="raw_input"
                               name="age" id="age" type="text" defaultValue={this.props.formState.age} placeholder="Type your answer here..."/>
                        <RegularButton handleOk={this.handleOk}/>
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

    handleOk = () => {
        // Validation goes here.

        this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)       // Enter is pressed.
            this.handleOk();
    }

    render() {
        let label = (<label className="input_label" htmlFor="date_of_birth">
            <span className="question_number">3 {this.props.svgArrow}</span><span>Where do you <strong>live</strong>?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="date_of_birth">
                <span className="question_number">3 {this.props.svgArrow}</span><span>{this.props.formState.name}, where do you <strong>live</strong>?</span></label>);

        return (
            <section className="user_location form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} onKeyUp={this.handleEnter} className="raw_input"
                               name="location" id="location" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                        <RegularButton handleOk={this.handleOk}/>
                    </div>
                </div>
            </section>
        );
    }
}

export {Name, Age, Location};