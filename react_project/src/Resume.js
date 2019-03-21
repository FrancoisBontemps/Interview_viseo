import React from 'react';
import * as firebase from 'firebase';
import { updateFirebase } from './Firebase_config.js';

class Resume extends React.Component {
    state = { appreciation: '', moyenne: 0 };

    dismiss() {
        const { ResumeUnmount } = this.props;
        ResumeUnmount();
    }
    handleChange = ({ target }) => {
        this.setState({ appreciation: target.value });
    };

    handleSubmit = event => {
        const { chapnum } = this.props;
        const { appreciation } = this.state;
        const appreciationId = 'Appreciation' + chapnum;
        localStorage.setItem(appreciationId, appreciation);
        event.preventDefault();
        this.dismiss();
    };
    gotData = donnees => {
        const objChapter = donnees.val();
        const nbSections = Object.keys(objChapter).length;
        const moyenne = Object.values(objChapter).reduce((acc, value) => acc + parseInt(value), 0) / nbSections;
        console.log(moyenne);
        this.setState({ moyenne: moyenne });
    };
    errData = err => {
        console.log(err);
    };

    calculMoyenne = () => {
        const { username, chapnum } = this.props;
        const str_db = 'student/' + username + '/chapter' + chapnum.toString();
        const ref = firebase.database().ref(str_db);
        ref.on('value', this.gotData, this.errData);
    };

    componentDidMount() {
        this.calculMoyenne();
    }

    render() {
        const { appreciation } = this.state;
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1> Résumé Chapitre {this.props.chapnum}</h1>
                    <div>
                        Moyenne du Chapitre {this.props.chapnum} : {this.state.moyenne}
                    </div>
                </div>
                <label>
                    Appreciation :
                    <input
                        type="text"
                        color={'green'}
                        value={appreciation}
                        onChange={this.handleChange}
                        placeholder="Appreciation"
                    />
                </label>
                <input type="submit" value="Suivant" align="center" />
            </form>
        );
    }
}
export default Resume;
