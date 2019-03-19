import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import Chapter from './Chapter';
import Section from './Section';
import Resume from './Resume';

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
        this.setState({ renderForm: false, renderChapter: true });
    };
    handleChapterUnmount = () => {
        this.setState({ renderChapter: false, renderSection: true });
    };
    handleResumeUnmount = () => {
        this.setState({ renderResume: false });
    };
    handleSectionUnmount = () => {
        const { sectionIndex, renderSection, renderNextSection } = this.state;
        this.setState({
            sectionIndex: sectionIndex + 1,
            renderSection: !renderSection,
            renderNextSection: !renderNextSection
        });

        if (sectionIndex === 3) {
            this.setState({ renderResume: true });
        }
    };
    createSection(data) {
        const { sectionIndex } = this.state;
        console.log(Object.values(data.sections)[sectionIndex].title);
        return (
            <div>
                <Section
                    title={Object.values(data.sections)[sectionIndex].title}
                    data={data}
                    sectionIndex={sectionIndex}
                    unmountSection={this.handleSectionUnmount}
                />
            </div>
        );
    }
    Calc_Moy(data) {
        const nb_section = Object.keys(data.sections).length;
        let numNote = new Array();
        for (let i = 1; i <= nb_section; i++) {
            numNote.push(localStorage.getItem('section' + i));
        }
        let moy =
            numNote.reduce(function(acc, val) {
                return acc + parseInt(val);
            }, 0) / numNote.length;
        return moy;
    }
    render() {
        const { renderForm, renderChapter, renderSection, renderNextSection, sectionIndex, renderResume } = this.state;

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
                    <div className="Resume">
                        {renderResume ? (
                            <Resume
                                moyenne={this.Calc_Moy(data)}
                                chapnum={data.chapters.chapter1.title}
                                unmountResume={this.handleResumeUnmount}
                            />
                        ) : null}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
