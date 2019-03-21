import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import Chapter from './Chapter';
import Section from './Section';
import Resume from './Resume';
import ResumeAllChapter from './ResumeAllChap';

const data = require('./Interview');
const initialState = {
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
    username: ''
};
var firebase = require('firebase');
var config = {
    apiKey: 'AIzaSyDmRPV5SUPIW_oFQj9xweTMHAXLbPA4imU',
    authDomain: 'viseo-36d12.firebaseapp.com',
    databaseURL: 'https://viseo-36d12.firebaseio.com',
    projectId: 'viseo-36d12',
    storageBucket: 'viseo-36d12.appspot.com',
    messagingSenderId: '131746919965'
};
firebase.initializeApp(config);

let obj_chapter = {};

class App extends React.Component {
    state = initialState;

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
            username: userName
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
                note : [],
                appreciation : []
            }
            );

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
                    username={this.state.username}
                />
            </div>
        );
    }
    gotData = donnes => {
        const { sectionIndex, chapterIndex, note } = this.state;
        console.log('Chapitre index courant : ' + chapterIndex);
        if (this.state.username && data.chapters['chapter' + chapterIndex].sections.length === sectionIndex) {
            console.log(donnes.val());
            obj_chapter = donnes.val();
            let numNote = new Array();
            for (let i = 1; i <= data.chapters['chapter' + chapterIndex].sections.length; i++) {
                numNote.push(obj_chapter['section' + i]);
                console.log(numNote);
            }

            let moy = numNote.reduce(function(acc, val) {
                return acc + parseInt(val);
            }, 0);
            if (numNote.length === 0) {
                moy = 0;
            } else {
                moy = moy / numNote.length;
            }

            if (chapterIndex < Object.keys(data.chapters).length + 1) {
                if (data.chapters['chapter' + chapterIndex].sections.length === sectionIndex) {
                    if (!isNaN(moy)) note.push(moy);
                }
            }
            console.log(obj_chapter);
            console.log(note);
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
            appreciations
        } = this.state;


        if (chapterIndex < Object.keys(data.chapters).length + 1) {
            let numNote = [];
            for (let i = 1; i <= data.chapters['chapter' + chapterIndex].sections.length; i++) {
                numNote.push(localStorage.getItem('section' + i));
            }
            let moy = numNote.reduce(function(acc, val) {
                return acc + parseInt(val);
            }, 0);
            if (numNote.length === 0) {
                moy = 0;
            } else {
                moy = moy / numNote.length;
            }
            if (data.chapters['chapter' + chapterIndex].sections.length === sectionIndex) {
                note.push(moy);
            }
        }
        return (
            <div className="App">
                <header className="NameForm">
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
                                moyenne={note[chapterIndex - 1]}
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
