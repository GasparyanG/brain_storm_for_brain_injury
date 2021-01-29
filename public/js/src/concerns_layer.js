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

        this.letters = {
            1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F',
            7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L', 13: 'M'
        }
    }

    onCheck = (e) => {
        let concerns = [...this.props.formState.concerns];
        if (concerns.includes(e.target.dataset.value)) {
            let index = concerns.indexOf(e.target.dataset.value);
            if (index > -1) {
                concerns.splice(index, 1);
            }
        } else {
            concerns.push(e.target.dataset.value);
        }

        console.log(concerns);

        this.props.checkboxHandler("concerns", concerns);
    }

    createCheckbox(key) {
        let value = this.state.concerns[key];


        return (
            <div key={value + ' ' + key} className="choice_part">
                <div className="choice_letter">{this.letters[key]}</div>
                <div className="choice_name">{value}</div>
            </div>
        );
    }

    render () {
        // Prepare Checkbox array
        const checkboxItems = [];
        for (let key in this.state.concerns) {
            checkboxItems.push(this.createCheckbox(key));
        }

        let label = (<label className="input_label" htmlFor="injury_date">
            <span className="question_number">5 {this.props.svgArrow}</span>Check your <strong>greatest concerns</strong> (check <strong>up to four</strong> and <strong>star</strong> the most troubling one)</label>);
        if (this.props.formState.name !== "")
            label = (<label className="input_label" htmlFor="injury_date">
                <span className="question_number">5 {this.props.svgArrow}</span>{this.props.formState.name}, check your <strong>greatest concerns</strong> (check <strong>up to four</strong> and <strong>star</strong> the most troubling one)</label>);

        return (
            <section className="concerns form_layer">
                <div className="layer_content">
                    <div className="questions concern_questions">
                        {label}
                        <div className="choices_section">
                            {checkboxItems}
                            <div className="choice_part">
                                <div className="choice_letter">N</div>
                                <div className="choice_name">
                                    <span>Other</span>
                                    <input className="choice_other_raw_input hidden" type="text" placeholder="Type your answer..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export {Concerns};