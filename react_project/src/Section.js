import React from 'react';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: props.name, parts: props.parts };
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
    handleClick1() {
        localStorage.setItem('FirstGrade', 1);
    }
    handleClick2() {
        localStorage.setItem('FirstGrade', 2);
    }
    handleClick3() {
        localStorage.setItem('FirstGrade', 3);
    }
    handleClick4() {
        localStorage.setItem('FirstGrade', 4);
    }
    handleClick5() {
        localStorage.setItem('FirstGrade', 5);

    }
    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <div>{this.DisplayList(this.state.parts)}</div>
                <button onClick={this.handleClick1}>1</button>
                <button onClick={this.handleClick2}>2</button>
                <button onClick={this.handleClick3}>3</button>
                <button onClick={this.handleClick4}>4</button>
                <button onClick={this.handleClick5}>5</button>
            </div>
        );
    }
}
export default Section;
