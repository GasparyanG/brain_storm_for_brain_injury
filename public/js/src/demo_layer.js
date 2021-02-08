import {
    CSSClasses,
    SymbolicConstants,
    ErrorMessage,
    validateEmail,
    DefaultErrorMessages,
    RegularButton
} from "./helper_components";

class Name extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOk = () => {
        // Validation goes here.
        if (!this.props.errors.hasOwnProperty("name"))
            this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)
            this.handleOk();
    }

    handleInput = (e) => {
        let errors;
        let form = this.props.prepareForm(e.target.name, e.target.value);

        if (e.target.value !== "") {
            errors = this.props.prepareErrors("name", false, true);
        } else
            errors = this.props.prepareErrors("name", {message: DefaultErrorMessages.name});

        this.props.updateFormAndError(form, errors);
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
                        <label className="input_label" htmlFor="name"><span className="question_number">  {this.props.svgArrow}</span>
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
        if (this.props.errors.hasOwnProperty("age")) return;

        if (this.props.formState[this.prev_layer] == "")
            this.props.changeToPrev()
        else
            this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)
            this.handleOk();
    }

    numbersOnly = () => {
        let errors = this.props.prepareErrors("age", {message: DefaultErrorMessages.numbers_only});
        this.props.updateFormAndError(this.props.formState, errors);
        let layer = document.querySelector("." + CSSClasses.age_event_layer);
        layer.classList.add(CSSClasses.warning_shake);

        setTimeout(() => {layer.classList.remove(CSSClasses.warning_shake)}, SymbolicConstants.shake_timeout)
    }

    handleInput = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = '';
            return this.numbersOnly();
        }

        let errors;
        let form = this.props.prepareForm(e.target.name, e.target.value);


        if (e.target.value !== "" && (e.target.value <= SymbolicConstants.min_age || e.target.value > SymbolicConstants.max_age)) {
            errors = this.props.prepareErrors(CSSClasses.age, {message: DefaultErrorMessages.age_out_of_rage});
        } else if (e.target.value !== "") {
                errors = this.props.prepareErrors(CSSClasses.age, false, true);
        } else
            errors = this.props.prepareErrors(CSSClasses.age, {message: DefaultErrorMessages.age_required});

        this.props.updateFormAndError(form, errors);
    }

    validateInput = () => {
        if (this.props.formState.age !== "") return true;
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
        let label = (<label className="input_label" htmlFor="age"><span className="question_number">  {this.props.svgArrow}</span><span>How <strong>old</strong> are you?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="age"><span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, how <strong>old</strong> are you?</span></label>);

        let validityElement = this.hintOrAction(CSSClasses.age);

        return (
            <section className="user_age form_layer">
                <div className="event_layer age_event_layer">
                    <div className="layer_content">
                        <div className="questions">
                            {label}
                            <input onChange={this.handleInput} onKeyUp={this.handleEnter} className="raw_input"
                                   name="age" id="age" type="text" defaultValue={this.props.formState.age} placeholder="Type your answer here..."/>
                            {validityElement}
                        </div>
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

        if (this.props.errors.hasOwnProperty(CSSClasses.location)) return;

        if (this.props.formState[this.prev_layer] == "")
            this.props.changeToPrev()
        else
            this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)       // Enter is pressed.
            this.handleOk();
    }

    handleInput = (e) => {
        let errors;
        let form = this.props.prepareForm(e.target.name, e.target.value);

        if (e.target.value !== "") {
            errors = this.props.prepareErrors(CSSClasses.location, false, true);
        } else
            errors = this.props.prepareErrors(CSSClasses.location, {message: DefaultErrorMessages.location_required});

        this.props.updateFormAndError(form, errors);
    }

    validateInput = () => {
        if (this.props.formState.location !== "") return true;
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
        let label = (<label className="input_label" htmlFor="date_of_birth">
            <span className="question_number">  {this.props.svgArrow}</span><span>Where do you <strong>live</strong>?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="date_of_birth">
                <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, where do you <strong>live</strong>?</span></label>);

        let validityElement = this.hintOrAction(CSSClasses.location);

        return (
            <section className="user_location form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <input onChange={this.handleInput} onKeyUp={this.handleEnter} className="raw_input"
                               name="location" id="location" type="text" defaultValue={this.props.formState.location} placeholder="Type your answer here..."/>
                        {validityElement}
                    </div>
                </div>
            </section>
        );
    }
}

class Email extends React.Component {
    constructor(props) {
        super(props);

        this.prev_layer = CSSClasses.location;
    }

    handleOk = () => {
        // Validation goes here.

        // if (this.props.errors.hasOwnProperty(CSSClasses.email)) return;

        if (this.props.formState[this.prev_layer] == "")
            this.props.changeToPrev()
        else
            this.props.changeToNext();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13)       // Enter is pressed.
            this.handleOk();
    }

    handleInput = (e) => {
        let errors;
        let form = this.props.prepareForm(e.target.name, e.target.value);

        // Check email format here.
        if (e.target.value !== "" && !validateEmail(e.target.value)) {
            errors = this.props.prepareErrors(CSSClasses.email, {message: DefaultErrorMessages.email_wrong_format});
        } else {
            errors = this.props.prepareErrors(CSSClasses.email, false, true);
        }

        this.props.updateFormAndError(form, errors);
    }

    validateInput = () => {
        if (this.props.formState.email !== "") return true;
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
        let label = (<label className="input_label" htmlFor="email">
            <span className="question_number">  {this.props.svgArrow}</span><span>What is your <strong>email</strong> address?</span></label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="email">
                <span className="question_number">  {this.props.svgArrow}</span><span>{this.props.formState.name}, what is your <strong>email</strong> address?</span></label>);

        let validityElement = this.hintOrAction(CSSClasses.email);

        return (
            <section className="user_email form_layer">
                <div className="layer_content">
                    <div className="questions">
                        {label}
                        <div className="question_usage_hint">
                            You can leave this field <strong>empty</strong>.
                        </div>
                        <input onChange={this.handleInput} onKeyUp={this.handleEnter} className="raw_input"
                               name="email" id="email" type="text" defaultValue={this.props.formState.email} placeholder="example@mail.tld"/>
                        {validityElement}
                    </div>
                </div>
            </section>
        );
    }
}

export {Name, Age, Location, Email};