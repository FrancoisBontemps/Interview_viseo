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
        chapterIndex : 1,
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
        const { chapterIndex } = this.state;
        this.setState({
            renderChild: false,
            renderChapter: true,
            renderSection: false,
            renderNextSection: false,
            renderResume: false,
            sectionIndex : 0,
            chapterIndex : chapterIndex + 1
        });
    };
    createSection(data) {
        const { sectionIndex } = this.state;
        return (
            <div>
                <Section data={data} sectionIndex={sectionIndex} SectionUnmount={this.handleSectionUnmount} />
            </div>
        );
    }
    render() {
        const { renderForm, renderChapter, renderSection, renderNextSection, sectionIndex, chapterIndex } = this.state;
        console.log(chapterIndex);
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
        if (nb_section === sectionIndex) {
            this.state.renderResume = true;
        }
        return (
            <div className="App">
                <header className="NameForm">
                    <img src={logo} className="App-logo" />
                    <div className="Form">{renderForm ? <NameForm FormUnmount={this.handleFormUnmount} /> : null}</div>
                    <div className="Chapter">
                        {renderChapter && chapterIndex < Object.keys(data.chapters).length +1 ? (
                            <Chapter
                                chapnum={chapterIndex}
                                data = {data}
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
                        <Resume chapnum="chapter1" ResumeUnmount={this.handleResumeUnmount} moyenne={moy} />
                    ) : null}
                </header>
            </div>
        );
    }
}

export default App;
