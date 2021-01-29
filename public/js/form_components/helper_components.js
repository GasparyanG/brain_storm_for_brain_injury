function RegularButton(props) {
    return React.createElement(
        "div",
        { className: "action_box" },
        React.createElement("input", { className: "raw_button", type: "button", value: "OK" }),
        React.createElement(
            "span",
            { className: "action_prompt" },
            React.createElement(
                "span",
                { className: "prompt_part pp_press" },
                "press"
            ),
            React.createElement(
                "span",
                { className: "prompt_part pp_enter" },
                "Enter \u21B5"
            )
        )
    );
}

export { RegularButton };