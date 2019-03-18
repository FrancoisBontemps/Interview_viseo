import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import Chapter from './Chapter';
import Section from './Section';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderForm: true,
            renderChapter: false,
            renderSection: false,
            renderNextSection: false,
            sectionIndex: 0
        };
    }
    handleFormUnmount = () => {
        this.setState({ renderForm: false, renderChapter: true });
    };
    handleChapterUnmount = () => {
        this.setState({ renderChapter: false, renderSection: true });
    };
    handleSectionUnmount = () => {
        const { sectionIndex, renderSection, renderNextSection } = this.state;
        this.setState({
            sectionIndex: sectionIndex + 1,
            renderSection: !renderSection,
            renderNextSection: !renderNextSection
        });
    };
    createSection(data) {
        const { sectionIndex } = this.state;
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
    render() {
        const data = require('./Interview');
        const { renderForm, renderChapter, renderSection, renderNextSection, sectionIndex } = this.state;
        console.log(Object.keys(data.sections).length);
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
                </header>
            </div>
        );
    }
}

export default App;
