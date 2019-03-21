import React from 'react';
import * as firebase from 'firebase';
import { userName } from './NameForm';

class Resume extends React.Component {
    state = { appreciation: '', moy: 0 };

    handleChange = ({ target }) => {
        this.setState({ appreciation: target.value });
    };

    handleSubmit = event => {
        const { chapnum, ResumeUnmount } = this.props;
        const { appreciation } = this.state;
        const appreciationId = 'Appreciation' + chapnum;

        localStorage.setItem(appreciationId, appreciation);

        let appreciationObj = { [appreciationId.toString()]: appreciation };

        firebase
            .database()
            .ref('student/' + userName.name)
            .child('chapter/' + chapnum)
            .update(appreciationObj);

        ResumeUnmount();
    };

    displayNote = tabNote => {
        let moyenne = 0;
        if (tabNote !== undefined && tabNote !== null) {
            for (let note in tabNote) {
                moyenne += parseInt(tabNote[note]);
            }
            this.setState({ moy: moyenne / Object.keys(tabNote).length });
        }
    };

    moyenneCalc = () => {
        const { chapnum } = this.props;
        let tabNotes = {};
        firebase
            .database()
            .ref('student/' + userName.name + '/' + 'chapter/' + chapnum)
            .on(
                'value',
                snapshot => {
                    if (snapshot.val() != null) {
                        tabNotes = snapshot.val();
                        this.displayNote(tabNotes);
                    }
                },
                function(errorObject) {
                    console.log('The read failed: ' + errorObject.code);
                }
            );
    };

    componentDidMount() {
        this.moyenneCalc();
    }

    render() {
        const { appreciation, moy } = this.state;
        const { chapnum, name } = this.props;
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1>
                        {' '}
                        Résumé Chapitre {chapnum} pour {name}
                    </h1>
                    <div>
                        Moyenne du Chapitre {chapnum} : {moy}
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
