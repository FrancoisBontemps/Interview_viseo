import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import Chapter from './Chapter';
import Section from './Section';
import Resume from './Resume';
import ResumeAllChapter from './ResumeAllChap';
import { userName } from './NameForm';
import { firebase, data } from './config';

class App extends React.Component {
    state = {
        renderForm: true,
        renderChapter: false,
        renderSection: false,
        renderNextSection: false,
        renderResume: false,
        renderResumeAllChapter: false,
        chapterIndex: 1,
        sectionIndex: 0,
        sectionNote: [],
        chapterNote: [],
        appreciations: []
    };
    handleFormUnmount = () => {
        this.setState({ renderForm: false, renderChapter: true, renderResume: false });
    };
    handleChapterUnmount = () => {
        this.setState({ renderChapter: false, renderSection: true, renderResume: false });
    };
    handleSectionUnmount = () => {
        const { sectionIndex, chapterIndex, renderSection, renderNextSection } = this.state;
        this.setState({
            sectionIndex: sectionIndex + 1,
            renderSection: !renderSection,
            renderNextSection: !renderNextSection
        });
        if (data.chapters['chapter' + chapterIndex].sections.length === sectionIndex + 1) {
            this.setState({
                renderResume: true
            });
        }
    };

    handleResumeUnmount = () => {
        const { chapterIndex, appreciations } = this.state;
        this.setState({
            renderChild: false,
            renderChapter: true,
            renderSection: false,
            renderNextSection: false,
            renderResume: false,
            sectionIndex: 0,
            chapterIndex: chapterIndex + 1
        });

        appreciations.push(
            firebase
                .database()
                .ref('student/' + userName.name)
                .child('chapter/' + chapterIndex)
                .child('Appreciation' + chapterIndex)
                .on(
                    'value',
                    function(snapshot) {
                        console.log(snapshot.val());
                    },
                    function(errorObject) {
                        console.log('The read failed: ' + errorObject.code);
                    }
                )
        );

        if (Object.keys(data.chapters).length === chapterIndex) {
            this.setState({
                renderResumeAllChapter: true,
                renderChapter: false,
                chapterIndex: 1
            });
        }
    };
    createSection(data) {
        const { sectionIndex, chapterIndex } = this.state;
        return (
            <div>
                <Section
                    data={data}
                    sectionIndex={sectionIndex}
                    chapterIndex={chapterIndex}
                    SectionUnmount={this.handleSectionUnmount}
                />
            </div>
        );
    }

    render() {
        const {
            renderForm,
            renderChapter,
            renderResume,
            renderSection,
            renderNextSection,
            sectionIndex,
            renderResumeAllChapter,
            chapterIndex,
            note,
            appreciations
        } = this.state;

        return (
            <div className="App">
                <header className="NameForm">
                    <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase.js" />
                    <img src={logo} className="App-logo" />
                    <div className="Form">{renderForm ? <NameForm FormUnmount={this.handleFormUnmount} /> : null}</div>
                    <div className="Chapter">
                        {renderChapter && chapterIndex < Object.keys(data.chapters).length + 1 ? (
                            <Chapter chapnum={chapterIndex} data={data} unmountChapter={this.handleChapterUnmount} />
                        ) : null}
                    </div>
                    <div className="Section">
                        {renderSection && sectionIndex < data.chapters['chapter' + chapterIndex].sections.length
                            ? this.createSection(data)
                            : null}
                    </div>
                    <div className="NextSection">
                        {renderNextSection && sectionIndex < data.chapters['chapter' + chapterIndex].sections.length
                            ? this.createSection(data)
                            : null}
                    </div>
                    <div className="Resume">
                        {renderResume ? (
                            <Resume
                                chapnum={chapterIndex}
                                ResumeUnmount={this.handleResumeUnmount}
                                name={userName.name}
                            />
                        ) : null}
                    </div>
                    <div className="ResumeAllChapter">
                        {renderResumeAllChapter ? (
                            <ResumeAllChapter tabNote={note} tabAppreciation={appreciations} />
                        ) : null}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
