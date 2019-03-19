import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import Chapter from './Chapter';
import Section from './Section';
import Resume from './Resume';

const data = require('./Interview');

class App extends React.Component {
    state = {
        renderForm: true,
        renderChapter: false,
        renderSection: false,
        renderNextSection: false,
        renderResume: false,
        sectionIndex: 0
    };
    handleFormUnmount = () => {
        this.setState({ renderForm: false, renderChapter: true, renderResume: false });
    };
    handleChapterUnmount = () => {
        this.setState({ renderChapter: false, renderSection: true, renderResume: false });
    };
    handleSectionUnmount = () => {
        this.setState(({ sectionIndex, renderSection, renderNextSection }) => ({
            sectionIndex: sectionIndex + 1,
            renderSection: !renderSection,
            renderNextSection: !renderNextSection,
            renderResume: false
        }));
    };

    handleResumeUnmount = () => {
        this.setState({
            renderChild: false,
            renderChapter: false,
            renderSection: false,
            renderNextSection: false,
            renderResume: false
        });
    };
    createSection(data) {
        const { sectionIndex } = this.state;
        return (
            <div>
                <Section data={data} sectionIndex={sectionIndex} unmountSection={this.handleSectionUnmount} />
            </div>
        );
    }
    render() {
        const { renderForm, renderChapter, renderSection, renderNextSection, sectionIndex } = this.state;
        const nb_section = Object.keys(data.sections).length;
        let numNote = new Array();
        for (let i = 1; i <= nb_section; i++) {
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
        if (Object.keys(data.sections).length === sectionIndex) {
            this.state.renderResume = true;
        }
        return (
            <div className="App">
                <header className="NameForm">
                    <img src={logo} className="App-logo" />
                    <div className="Form">{renderForm ? <NameForm unmountForm={this.handleFormUnmount} /> : null}</div>
                    <div className="Chapter">
                        {renderChapter ? (
                            <Chapter
                                chapnum={'Chapitre 1 : ' + data.chapters.chapter1.title}
                                sections={data.sections}
                                unmountChapter={this.handleChapterUnmount}
                            />
                        ) : null}
                    </div>
                    <div className="Section">
                        {renderSection && sectionIndex < Object.keys(data.sections).length
                            ? this.createSection(data)
                            : null}
                    </div>
                    <div className="NextSection">
                        {renderNextSection && sectionIndex < Object.keys(data.sections).length
                            ? this.createSection(data)
                            : null}
                    </div>
                    {this.state.renderResume ? (
                        <Resume chapnum="chapter1" unmountResume={this.handleResumeUnmount} moyenne={moy} />
                    ) : null}
                </header>
            </div>
        );
    }
}

export default App;
