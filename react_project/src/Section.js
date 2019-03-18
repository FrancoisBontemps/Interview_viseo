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
    handleClick = Grade => {
        const { title } = this.state;
        localStorage.setItem(title, Grade);
        console.log(title, Grade);
        this.nextSection();
    };

    handleClick1() {
        const { title } = this.state;
        localStorage.setItem(title, '1');
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
                    <button onClick={this.handleClick(1)}>1</button>
                    <button id="2" value="2" onClick={this.handleClick(2)}>
                        2
                    </button>
                    <button id="3" value="3" onClick={this.handleClick(3)}>
                        3
                    </button>
                    <button id="4" value="4" onClick={this.handleClick(4)}>
                        4
                    </button>
                    <button id="5" value="5" onClick={this.handleClick(5)}>
                        5
                    </button>
                </div>
            </div>
        );
    }
}
export default Section;
