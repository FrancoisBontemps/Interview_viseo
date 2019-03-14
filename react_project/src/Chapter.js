import React from 'react';

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chapnum: props.chapnum, section: props.section };
    }
    dismiss() {
        const {unmountChapter} = this.props;
        unmountChapter();
    }
    handleClick = () => {
        this.dismiss();
    };
    DisplayList(props) {
        return (
            <div>
                {props.map((prop, index) => (
                    <h4 key={index}> {prop} </h4>
                ))}
            </div>
        );
    }

    render() {
        const { chapnum, section } = this.state;

        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>{chapnum}</h1>
                <div>{this.DisplayList(section)}</div>
                <button onClick={this.handleClick}>Démarrez</button>
            </div>
        );
    }
}
export default Chapter;
