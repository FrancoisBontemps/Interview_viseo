import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import Chapter from './Chapter';
import Section from './Section';
import Resume from './Resume';
import ResumeAllChapter from './ResumeAllChap';
import { firebase, config } from './Firebase_config';
firebase.initializeApp(config);

const data = require('./Interview');

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
        note: [],
        appreciations: [],
        userName: ''
    };

    handleFormUnmount = () => {
        this.setState({ renderForm: false, renderChapter: true, renderResume: false });
    };
    handleChapterUnmount = () => {
        this.setState({ renderChapter: false, renderSection: true, renderResume: false });
    };
    handleSectionUnmount = () => {
        const { sectionIndex, chapterIndex, renderSection, renderNextSection } = this.state;
        const endChapter = data.chapters['chapter' + chapterIndex].sections.length === sectionIndex + 1;
        this.setState({
            sectionIndex: sectionIndex + 1,
            renderResume : endChapter ? true : false,
            renderSection: !renderSection,
            renderNextSection: !renderNextSection
        });
    };

    handleUserNameChanged = userName => {
        this.setState({
            userName
        });
    };

    handleResumeUnmount = () => {
        const { chapterIndex, appreciations } = this.state;
        const endInterview = Object.keys(data.chapters).length === chapterIndex;
        this.setState({
            renderChild: false,
            renderChapter: endInterview ? false : true,
            renderSection: false,
            renderNextSection: false,
            renderResume: false,
            sectionIndex: 0,
            renderResumeAllChapter: endInterview? true : false,
            chapterIndex: endInterview ? 1 : chapterIndex + 1
        });
        appreciations.push(localStorage.getItem('Appreciation' + chapterIndex));
    };

    handleResumeAllChapterUnmount = () => {
        this.setState(initialState);
        this.setState({
                note: [],
                appreciation: []
            }
        );
    }
    createSection(data) {
        const { sectionIndex, chapterIndex, userName } = this.state;
        return (
            <div>
                <Section
                    data={data}
                    sectionIndex={sectionIndex}
                    SectionUnmount={this.handleSectionUnmount}
                    username={userName}
                    chapnum={chapterIndex}
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
            appreciations,
            userName
        } = this.state;


        return (
            <div className="App">
                <p> {note[chapterIndex - 1]}</p>
                <header className="NameForm">
                    <img src={logo} className="App-logo" />
                    <div className="Form">
                        {renderForm ? (
                            <NameForm FormUnmount={this.handleFormUnmount} setUsername={this.handleUserNameChanged} />
                        ) : null}
                    </div>
                    <div className="Chapter">
                        {renderChapter && chapterIndex < Object.keys(data.chapters).length + 1 ? (
                            <Chapter
                                chapnum={chapterIndex}
                                data={data}
                                unmountChapter={this.handleChapterUnmount}
                                username={userName}
                            />
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
                                moyenne={note[chapterIndex - 1]}
                                username={userName}
                            />
                        ) : null}
                    </div>
                    <div className="ResumeAllChapter">
                        {renderResumeAllChapter ? (
                            <ResumeAllChapter
                                tabNote={note}
                                tabAppreciation={appreciations}
                                ResumeAllChapterUnmount={this.handleResumeAllChapterUnmount}
                            />
                        ) : null}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
