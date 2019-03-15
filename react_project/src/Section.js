import React from 'react';
import './Section.css';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: props.title, data: props.data, sectionIndex: props.sectionIndex };
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);
        this.handleClick5 = this.handleClick5.bind(this);
    }
    DisplayParts() {
        const { sectionIndex, data } = this.state;
        return (
            <div>
                {Object.values(data.sections)[sectionIndex].notions.map((value, index) => (
                    <h4 key={index}>
                        {' '}
                        {value} : {Object.values(data.Notions[value])}{' '}
                    </h4>
                ))}
            </div>
        );
    }
    dismiss() {
        const { unmountSection } = this.props;
        unmountSection();
    }

    nextSection = () => {
        this.dismiss();
    };

    handleClick1() {
        localStorage.setItem('this.props.name', '1');
        this.nextSection();
    }
    handleClick2() {
        localStorage.setItem('this.props.name', '2');
        this.nextSection();
    }
    handleClick3() {
        localStorage.setItem('this.props.name', '3');
        this.nextSection();
    }
    handleClick4() {
        localStorage.setItem('this.props.name', '4');
        this.nextSection();
    }
    handleClick5() {
        localStorage.setItem('this.props.name', '5');
        this.nextSection();
    }
    render() {
        const { title, data } = this.state;
        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>{title}</h1>
                <div>{this.DisplayParts()}</div>
                <div className="btn-group">
                    <button onClick={this.handleClick1}>1</button>
                    <button onClick={this.handleClick2}>2</button>
                    <button onClick={this.handleClick3}>3</button>
                    <button onClick={this.handleClick4}>4</button>
                    <button onClick={this.handleClick5}>5</button>
                </div>
            </div>
        );
    }
}
export default Section;
