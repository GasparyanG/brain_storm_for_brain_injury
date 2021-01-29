function RegularButton(props) {
    return (
        <div className="action_box">
            <input className="raw_button" type="button" value="OK"/>
            <span className="action_prompt">
                <span className="prompt_part pp_press">press</span>
                <span className="prompt_part pp_enter">Enter ↵</span>
            </span>
        </div>
    );
}

export {RegularButton};