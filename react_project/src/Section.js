import React from 'react';
import './Section.css';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            data: props.data,
            sectionIndex: props.sectionIndex
        };
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
        const { SectionUnmount } = this.props;
        SectionUnmount();
    }

    nextSection = () => {
        this.dismiss();
    };

    handleChange = e => {
        const { sectionIndex } = this.state;
        const sectionId = 'section' + (sectionIndex + 1);
        console.log('sectionId: ' + sectionId);
        const grade = e.target.value;
        localStorage.setItem(sectionId, grade);
        this.nextSection();
    };

    render() {
        const { data } = this.props;
        const title = Object.values(data.sections)[this.props.sectionIndex].title;
        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>{title}</h1>
                <div>{this.DisplayParts()}</div>
                <div onClick={this.handleChange} id="aBtnGroup" className="btn-group">
                    <button type="button" value="1" className="btn btn-default">
                        1
                    </button>
                    <button type="button" value="2" className="btn btn-default">
                        2
                    </button>
                    <button type="button" value="3" className="btn btn-default">
                        3
                    </button>
                    <button type="button" value="4" className="btn btn-default">
                        4
                    </button>
                    <button type="button" value="5" className="btn btn-default">
                        5
                    </button>
                </div>
            </div>
        );
    }
}

export default Section;
