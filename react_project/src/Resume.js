import React from 'react';
import * as firebase from 'firebase';
import { userName } from './NameForm';

class Resume extends React.Component {
    state = { appreciation: '' };

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

    moyenneCalc = () => {
        const { chapnum } = this.props;
        firebase
            .database()
            .ref('student/' + userName.name + 'chapter/' + chapnum)
            .on(
                'value',
                function(snapshot) {
                    if (snapshot.val() != null) {
                        console.log(snapshot.val());
                    }
                },
                function(errorObject) {
                    console.log('The read failed: ' + errorObject.code);
                }
            );

        //TEST FIREBASE
        console.log(firebase.database().ref('student/' + userName.name + 'chapter/' + chapnum));
    };

    render() {
        const { appreciation } = this.state;
        const { chapnum, name } = this.props;
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1>
                        {' '}
                        Résumé Chapitre {chapnum} pour {name}
                    </h1>
                    <div>
                        Moyenne du Chapitre {chapnum} : {this.moyenneCalc()}
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
