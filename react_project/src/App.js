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

    handleUserNameChanged = userName => {
        this.setState({
            username: userName
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
        const { sectionIndex, chapterIndex } = this.state;
        return (
            <div>
                <Section
                    data={data}
                    sectionIndex={sectionIndex}
                    chapterIndex={chapterIndex}
                    SectionUnmount={this.handleSectionUnmount}
                    username={this.state.username}
                    chapnum={this.state.chapterIndex}
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
        let numNote = new Array();
        var str_db = 'student/' + this.state.username + '/chapter' + this.state.chapterIndex.toString();
        var ref = firebase.database().ref(str_db);
        ref.on('value', this.gotData, this.errData);
        /*
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
                    note.push(moy);
                }
            }*/

        console.log('noteee :' + note[chapterIndex - 1]);
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
                                username={this.state.username}
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
                                username={this.state.username}
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
