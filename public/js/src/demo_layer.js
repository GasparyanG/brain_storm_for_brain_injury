import {CSSClasses, ErrorMessage, DefaultErrorMessages, RegularButton} from "./helper_components";

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

    handleInput = (e) => {
        this.props.handler(e);

        if (e.target.value !== "") {
            this.props.onError("name", false, true);
        } else
            this.props.onError("name", {message: DefaultErrorMessages.name});
    }

    validateInput = () => {
        if (this.props.formState.name !== "") return true;
        return false;
    }

    hintOrAction = (field) => {
        let isValid = this.validateInput();
        if (this.props.errors.hasOwnProperty(field))
            return <ErrorMessage errors={this.props.errors} field={field}/>

        return (
            <RegularButton errors={this.props.errors} isValid={isValid} formState={this.props.formState} handleOk={this.handleOk}/>
        );
    }

    render() {
        let validityElement = this.hintOrAction(CSSClasses.name);

        return (
            <section className="user_name form_layer">
                <div className="layer_content">
                    <div className="questions">
                        <label className="input_label" htmlFor="name"><span className="question_number">1 {this.props.svgArrow}</span>
                            <span>Let's start with your <strong>name</strong>.</span></label>
                        <input onChange={this.handleInput} onKeyUp={this.handleEnter} className="raw_input"
                               name="name" id="name" type="text" defaultValue={this.props.formState.name} placeholder="Type here..."/>
                        {validityElement}
                    </div>
                </div>
            </section>
        )
    }
}

class Age extends React.Component {
    constructor(props) {
        super(props);

        this.prev_layer = CSSClasses.name;
    }

    handleOk = () => {
        // Validation goes here.

        if (this.props.formState[this.prev_layer] == "")
            this.props.changeToPrev()
        else
            this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)
            this.handleOk();
    }

    validateInput = () => {
        if (this.props.formState.age !== "") return true;
        return false;
    }

    render() {
        let label = (<label className="input_label" htmlFor="age"><span className="question_number">2 {this.props.svgArrow}</span><span>How <strong>old</strong> are you?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="age"><span className="question_number">2 {this.props.svgArrow}</span><span>{this.props.formState.name}, how <strong>old</strong> are you?</span></label>);

        let isValid = this.validateInput();

        return (
            <section className="user_age form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} onKeyUp={this.handleEnter} className="raw_input"
                               name="age" id="age" type="text" defaultValue={this.props.formState.age} placeholder="Type your answer here..."/>
                        <RegularButton isValid={isValid} handleOk={this.handleOk}/>
                    </div>
                </div>
            </section>
        );
    }
}


class Location extends React.Component {
    constructor(props) {
        super(props);

        this.prev_layer = CSSClasses.age;
    }

    handleOk = () => {
        // Validation goes here.

        if (this.props.formState[this.prev_layer] == "")
            this.props.changeToPrev()
        else
            this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)       // Enter is pressed.
            this.handleOk();
    }

    validateInput = () => {
        if (this.props.formState.location !== "") return true;
        return false;
    }

    render() {
        let label = (<label className="input_label" htmlFor="date_of_birth">
            <span className="question_number">3 {this.props.svgArrow}</span><span>Where do you <strong>live</strong>?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="date_of_birth">
                <span className="question_number">3 {this.props.svgArrow}</span><span>{this.props.formState.name}, where do you <strong>live</strong>?</span></label>);

        let isValid = this.validateInput();

        return (
            <section className="user_location form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.props.handler} onKeyUp={this.handleEnter} className="raw_input"
                               name="location" id="location" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                        <RegularButton isValid={isValid} handleOk={this.handleOk}/>
                    </div>
                </div>
            </section>
        );
    }
}

export {Name, Age, Location};