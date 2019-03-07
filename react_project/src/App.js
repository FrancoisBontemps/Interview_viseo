import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import SautLignes from './Saut6Lignes.js';
import Chapter from './Chapter';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { renderChild: true, renderChapter: false };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }
    handleChildUnmount() {
        this.setState({ renderChild: false, renderChapter: true });
    }
    render() {
        return (
            <div className="App">
                <header className="NameForm">
                    <img src={logo} className="App-logo" />
                    <div className="Form">
                        {this.state.renderChild ? <NameForm unmountMe={this.handleChildUnmount} /> : null}
                    </div>

                    <div>
                        {this.state.renderChapter ? (
                            <Chapter
                                chapnum={'Chapter 1'}
                                section={['section 1', 'section 2', 'section 3', 'section 4']}
                            />
                        ) : null}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
