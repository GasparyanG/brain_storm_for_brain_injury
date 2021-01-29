class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navigation_buttons">
                <div className="nav_btn navigation_to_prev">
                    <span className="nav-icon">
                        <svg height="9" width="14"><path d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"></path></svg>
                    </span>
                </div>
                <div className="nav_btn navigation_to_next">
                    <span className="nav-icon">
                        <svg height="9" width="14"><path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"></path></svg>
                    </span>
                </div>
            </div>
        );
    }
}

export {Navigation};