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
        this.state = { renderForm: true, renderChapter: false, renderSection: false };
        this.handleFormUnmount = this.handleFormUnmount.bind(this);
        this.handleChapterUnmount = this.handleChapterUnmount.bind(this);
    }
    handleFormUnmount() {
        this.setState({ renderForm: false, renderChapter: true });
    }
    handleChapterUnmount() {
        this.setState({ renderChapter: false, renderSection: true });
    }

    render() {
        return (
            <div className="App">
                <header className="NameForm">
                    <img src={logo} className="App-logo" />
                    <div className="Form">
                        {this.state.renderForm ? <NameForm unmountForm={this.handleFormUnmount} /> : null}
                    </div>

                    <div className="Chapter">
                        {this.state.renderChapter ? (
                            <Chapter
                                chapnum={'Chapter 1'}
                                section={['section 1', 'section 2', 'section 3', 'section 4']}
                                unmountChapter={this.handleChapterUnmount}
                            />
                        ) : null}
                    </div>
                    <div className="Section">{this.state.renderSection ? <Section name={"SECTION 1"} parts={["IDE", "GRADLE"]}/> : null}</div>
                </header>
            </div>
        );
    }
}

export default App;
