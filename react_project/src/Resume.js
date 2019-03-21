import React from 'react';
import * as firebase from 'firebase';
import { userName } from './NameForm';

class Resume extends React.Component {
    state = { appreciation: '' };

    handleChange = ({ target }) => {
        this.setState({ appreciation: target.value });
    };

    handleSubmit = event => {
        const { chapnum } = this.props;
        const { appreciation } = this.state;
        const appreciationId = 'Appreciation' + chapnum;

        localStorage.setItem(appreciationId, appreciation);

        let appreciationObj = {};
        appreciationObj[appreciationId.toString()] = appreciation;

        firebase
            .database()
            .ref('student/' + userName.name)
            .child('chapter/' + chapnum)
            .update(appreciationObj);
        event.preventDefault();
        const { ResumeUnmount } = this.props;
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
        /*        console.log(
            firebase
                .database()
                .ref('student/' + userName.name + 'chapter/' + chapnum)
                .once('value')
                .then(function(snapshot) {
                    var note = snapshot.val().section1;
                })
        );*/
    };

    render() {
        const { appreciation } = this.state;
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1>
                        {' '}
                        Résumé Chapitre {this.props.chapnum} pour {this.props.name}
                    </h1>
                    <div>
                        Moyenne du Chapitre {this.props.chapnum} : {this.moyenneCalc()}
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
