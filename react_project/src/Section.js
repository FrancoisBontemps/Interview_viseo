import React from 'react';
import './Section.css';
import { GradeDisplay } from './GradeDisplay';

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
        const { sectionIndex, data } = this.state;
        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>{Object.values(data.sections)[sectionIndex].title}</h1>
                <div>{this.DisplayParts()}</div>
                <GradeDisplay handleChange={this.handleChange} />
            </div>
        );
    }
}

export default Section;
