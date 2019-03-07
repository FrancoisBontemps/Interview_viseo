import React from 'react';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Chapter 1' };
    }
    render() {
        return (
            <div>
                <h3>CA MARCHE</h3>
            </div>
        );
    }
}
export default Section;
