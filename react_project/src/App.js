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
        this.compteur = 0;
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
        this.setState({ renderSection: false, renderNextSection: true });
    };

    render() {
        const sections = [
            <Section key="1" name={'SECTION 1'} parts={['IDE', 'GRADLE']} unmountSection={this.handleSectionUnmount} />,
            <Section key="2" name={'SECTION 2'} parts={['Application']} unmountSection={this.handleSectionUnmount} />,
            <Section
                key="3"
                name={'SECTION 3'}
                parts={['Activities & Lifecyle']}
                unmountSection={this.handleSectionUnmount}
            />,
            <Section
                key="4"
                name={'SECTION 4'}
                parts={['Context', 'Application Context VS Activity context']}
                unmountSection={this.handleSectionUnmount}
            />
        ];
        const { renderForm, renderChapter, renderSection, renderNextSection, sectionIndex } = this.state;
        return (
            <div className="App">
                <header className="NameForm">
                    <img src={logo} className="App-logo" />
                    <div className="Form">{renderForm ? <NameForm unmountForm={this.handleFormUnmount} /> : null}</div>
                    <div className="Chapter">
                        {renderChapter ? (
                            <Chapter
                                chapnum={'Chapter 1'}
                                section={['section 1', 'section 2', 'section 3', 'section 4']}
                                unmountChapter={this.handleChapterUnmount}
                            />
                        ) : null}
                    </div>
                    <div className="Section">
                        {renderSection && sections.length > sectionIndex ? sections[this.state.sectionIndex++] : null}
                    </div>
                    <div className="NextSection">
                        {renderNextSection && sections.length > this.state.sectionIndex
                            ? sections[this.state.sectionIndex++]
                            : null}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
