class Concerns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concerns: {
                1: "Headaches",                 2: "Pain",                                      3: "Fatigue",
                4: "Balance difficulties",      5: "Dizziness",                                 6: "Vision problems",
                7: "Hearing problems",          8: "Light or sound sensitivity",                9: "Trouble sleeping",
                10: "Thinking difficulties",    11: "Speaking or understanding difficulties",   12: "Mood difficulties",
                13: "Depression or anxiety"
            }
        }
    }

    onCheck = (e) => {
        let concerns = [...this.props.formState.concerns];
        if (concerns.includes(e.target.dataset.value)) {
            let index = concerns.indexOf(e.target.dataset.value);
            if (index > -1)
                concerns.slice(index, 1);
        } else {
            concerns.push(e.target.dataset.value);
        }

        this.props.checkboxHandler("concerns", concerns);
    }

    createCheckbox(key) {
        let value = this.state.concerns[key];
        return (
            <div key={value + "_" + key}>
                <input onChange={this.onCheck} className="checkbox_input" type="checkbox" id={"c_" + key} name={"c_" + key} data-value={key} value={value}/>
                <label className="checkbox_label" htmlFor={"c_" + key}> {value}</label>
            </div>
        );
    }

    render () {
        let svgArrow = (<svg height="10" width="11"><path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path><path d="M8 4v2H0V4z"></path></svg>);

        // Prepare Checkbox array
        const checkboxItems = [];
        for (let key in this.state.concerns) {
            checkboxItems.push(this.createCheckbox(key));
        }

        return (
            <section className="concerns form_layer">
                <div className="layer_content">
                    <div className="layer_header">Finally, concerns.</div>
                    <div className="questions concern_questions">
                        <label className="input_label" htmlFor="injury_date"><span className="question_number">6 {svgArrow}</span>Check your <strong>greatest concerns</strong> (check <strong>up to four</strong> and <strong>star</strong> the most troubling one)</label>
                        <div className="checkbox_container">
                            {checkboxItems}
                            <input onChange={this.props.handler} className="raw_input"
                                   name="concern_other" id="concern_other" type="text" defaultValue={this.props.formState.name} placeholder="Other"/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export {Concerns};