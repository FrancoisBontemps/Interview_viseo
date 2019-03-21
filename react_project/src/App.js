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

let objChapter = {};

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

    handleUserNameChanged = username => {
        this.setState({
            userName: username
        });
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

        appreciations.push(localStorage.getItem('Appreciation' + chapterIndex));

        if (Object.keys(data.chapters).length === chapterIndex) {
            this.setState({
                renderResumeAllChapter: true,
                renderChapter: false,
                chapterIndex: 1
            });
        }
    };
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

    gotData = donnes => {
        const { sectionIndex, chapterIndex, note, userName } = this.state;
        const nbSections = data.chapters['chapter' + chapterIndex].sections.length;
        if (userName && nbSections === sectionIndex) {
            objChapter = donnes.val();
            console.log(objChapter);
            const numNote = Object.keys(data.chapters['chapter' + chapterIndex].sections).reduce((acc, curr, index) => {
                console.log(objChapter['section' + (index + 1)]);
                return [...acc, objChapter['section' + (index + 1)]];
            }, []);

            const moy =
                numNote.length === 0 ? 0 : numNote.reduce((acc, curr) => acc + parseInt(curr), 0) / numNote.length;
            if (chapterIndex < Object.keys(data.chapters).length + 1) {
                if (data.chapters['chapter' + chapterIndex].sections.length === sectionIndex) {
                    if (!isNaN(moy)) note.push(moy);
                }
            }
        }
    };

    errData = err => {
        console.log(err);
    };
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

        const str_db = 'student/' + userName + '/chapter' + chapterIndex.toString();
        const ref = firebase.database().ref(str_db);

        ref.on('value', this.gotData, this.errData);
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
                        {renderResume ? <p> {note} </p> : null}
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
