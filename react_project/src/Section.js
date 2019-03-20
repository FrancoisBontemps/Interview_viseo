import React from 'react';
import './Section.css';
import { GradeDisplay } from './GradeDisplay';

class Section extends React.Component {
    DisplayTitle() {
        const { chapterIndex, sectionIndex, data } = this.props;
        const sect = data.chapters['chapter' + chapterIndex].sections[sectionIndex];

        return <h1>{data.sections[sect].title}</h1>;
    }
    DisplayText() {
        const {chapterIndex, sectionIndex, data} = this.props;
        const sect = data.chapters['chapter' + chapterIndex].sections[sectionIndex];
        const section = data.sections[sect];
        const text = {};
        if (section.notions !== undefined) {
            text.notion =
                <div>
                    {data.sections[sect].notions.map((value, index) => (
                        <h4 key={index}>
                            {' '}
                            {value} : {Object.values(data.Notions[value])}{' '}
                        </h4>
                    ))}
                </div>
            ;
        }
        if (section.questions !== undefined) {
            text.question =
                <div>
                    {data.sections[sect].questions.map((value, index) => (
                        <h4 key={index}>
                            {' '}
                            {value} : {Object.values(data.questions[value])}{' '}
                        </h4>
                    ))}
                </div>
            ;
        }
        return (
            <div>
                {text.notion}
                {text.question}
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
        const { sectionIndex } = this.props;
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
                <div>{this.DisplayText()}</div>
                <GradeDisplay handleChange={this.handleChange} />
            </div>
        );
    }
}

export default Section;
