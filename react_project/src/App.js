import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from './Images/Viseo.png';
import './App.css';
import NameForm from './NameForm.js';
import SautLignes from './Saut6Lignes.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { renderChild: true };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }
    handleChildUnmount() {
        this.setState({ renderChild: false });
    }
    render() {
        return (
            <div className="App">
                <header className="NameForm">
                    <img src={logo} className="App-logo" />
                    <SautLignes />
                    <div className="Form">
                        {this.state.renderChild ? <NameForm unmountMe={this.handleChildUnmount} /> : null}
                    </div>
                    <div />
                </header>
            </div>
        );
    }
}

export default App;
