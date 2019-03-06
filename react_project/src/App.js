import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import SautLignes from './Saut6Lignes.js';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="NameForm">
                    <img src={logo} className="App-logo" alt="logo" />
                    <SautLignes />
                    <div className="Form">
                        {' '}
                        <span>
                            <NameForm InputSection />
                        </span>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
