import React from 'react';
import './Section.css';
import { GradeDisplay } from './GradeDisplay';
import * as firebase from 'firebase';

class Section extends React.Component {
    DisplayTitle() {
        const { chapnum, sectionIndex, data } = this.props;
        const sect = data.chapters['chapter' + chapnum].sections[sectionIndex];

        return <h1>{data.sections[sect].title}</h1>;
    }
    DisplayNotions() {
        const { chapnum, sectionIndex, data } = this.props;
        const sect = data.chapters['chapter' + chapnum].sections[sectionIndex];

        if (data.sections[sect].notions !== undefined) {
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
        } else return;
    }
    DisplayQuestions() {
        const { chapnum, sectionIndex, data } = this.props;
        const sect = data.chapters['chapter' + chapnum].sections[sectionIndex];

        if (data.sections[sect].questions !== undefined) {
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
        } else return;
    }

    handleChange = e => {
        const { username, sectionIndex, chapnum } = this.props;
        const sectionId = 'section' + (sectionIndex + 1);
        const grade = e.target.value;
        const obj = {};

        obj[sectionId.toString()] = grade;
        firebase
            .database()
            .ref('student/' + username + '/chapter' + chapnum.toString())
            .update(obj);
        const { SectionUnmount } = this.props;
        SectionUnmount();
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
