class Concerns extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let svgArrow = (<svg height="10" width="11"><path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path><path d="M8 4v2H0V4z"></path></svg>);
        return (
            <section className="concerns form_layer">
                <div className="layer_content">
                    <div className="layer_header">Finally, concerns.</div>
                    <div className="questions concern_questions">
                        <label className="input_label" htmlFor="injury_date"><span className="question_number">5 {svgArrow}</span>Check your <strong>greatest concerns</strong> (check <strong>up to four</strong> and <strong>star</strong> the most troubling one)</label>
                        <div className="checkbox_container">
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_1" name="c_1" data-value="1" value="Headaches"/>
                                <label className="checkbox_label" htmlFor="c_1"> Headaches</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_2" name="c_2" data-value="2" value="Pain"/>
                                <label className="checkbox_label" htmlFor="c_2"> Pain</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_3" name="c_3" data-value="3" value="Fatigue"/>
                                <label className="checkbox_label" htmlFor="c_3"> Fatigue</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_4" name="c_4" data-value="4" value="Balance difficulties"/>
                                <label className="checkbox_label" htmlFor="c_4"> Balance difficulties</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_5" name="c_5" data-value="5" value="Dizziness"/>
                                <label className="checkbox_label" htmlFor="c_5"> Dizziness</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_6" name="c_6" data-value="6" value="Vision problems"/>
                                <label className="checkbox_label" htmlFor="c_6"> Vision problems</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_7" name="c_7" data-value="7" value="Hearing problems"/>
                                <label className="checkbox_label" htmlFor="c_7"> Hearing problems</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_8" name="c_8" data-value="8" value="Light or sound sensitivity"/>
                                <label className="checkbox_label" htmlFor="c_8"> Light or sound sensitivity</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_9" name="c_9" data-value="9" value="Trouble sleeping"/>
                                <label className="checkbox_label" htmlFor="c_9"> Trouble sleeping</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_10" name="c_10" data-value="10" value="Thinking difficulties (memory, attention, planning, getting started)"/>
                                <label className="checkbox_label" htmlFor="c_10"> Thinking difficulties</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_11" name="c_11" data-value="11" value="Speaking or understanding difficulties"/>
                                <label className="checkbox_label" htmlFor="c_11"> Speaking or understanding difficulties</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_12" name="c_12" data-value="12" value="Mood difficulties (agitation, irritability)"/>
                                <label className="checkbox_label" htmlFor="c_12"> Mood difficulties</label>
                            </div>
                            <div>
                                <input className="checkbox_input" type="checkbox" id="c_13" name="c_13" data-value="13" value="Depression or anxiety"/>
                                <label className="checkbox_label" htmlFor="c_13"> Depression or anxiety</label>
                            </div>
                            <input onChange={this.props.handler} className="raw_input"
                                   name="injury_date" id="injury_date" type="text" defaultValue={this.props.formState.name} placeholder="Other"/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export {Concerns};