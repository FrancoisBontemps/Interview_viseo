import React from 'react';
import './Section.css';
import { GradeDisplay } from './GradeDisplay';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            data: props.data,
            chapterIndex: props.chapterIndex,
            sectionIndex: props.sectionIndex
        };
    }
    DisplayTitle(){
        const { chapterIndex,sectionIndex, data } = this.state;
        const sect= data.chapters['chapter'+chapterIndex].sections[sectionIndex];

        return   <h1>{data.sections[sect].title}</h1>

    }
    DisplayNotions() {

        const { chapterIndex,sectionIndex, data } = this.state;
        const sect= data.chapters['chapter'+chapterIndex].sections[sectionIndex];

        if(data.sections[sect].notions !== undefined) {
            return (
                <div>
                    {data.sections[sect].notions.map((value, index) => (
                        <h4 key={index}>
                            {' '}
                            {value} : {Object.values(data.Notions[value])}{' '}
                        </h4>
                    ))}
                </div>
            );
        }
        else return;
    }
    DisplayQuestions() {
        const { chapterIndex,sectionIndex, data } = this.state;
        const sect= data.chapters['chapter'+chapterIndex].sections[sectionIndex];

        if(data.sections[sect].questions !== undefined) {
            return (
                <div>
                    {data.sections[sect].questions.map((value, index) => (
                        <h4 key={index}>
                            {' '}
                            {value} : {Object.values(data.questions[value])}{' '}
                        </h4>
                    ))}
                </div>

            );
        }
        else return;
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
        const grade = e.target.value;
        localStorage.setItem(sectionId, grade);
        this.nextSection();
    };

    render() {
        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <div>{this.DisplayTitle()}</div>
                <div>{this.DisplayNotions()}</div>
                <div>{this.DisplayQuestions()}</div>
                <GradeDisplay handleChange={this.handleChange} />
            </div>
        );
    }
}

export default Section;
