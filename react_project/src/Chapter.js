import React from 'react';
import Section from 'react';

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chapnum: props.chapnum, section: props.section, renderSection: false, isToggleOn: true };
    }

    DisplayList(props) {
        return (
            <div>
                {props.map(props => (
                    <h4> {props} </h4>
                ))}
            </div>
        );
    }
    render() {
        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>{this.state.chapnum}</h1>
                <div>{this.DisplayList(this.state.section)}</div>
            </div>
        );
    }
}
export default Chapter;
