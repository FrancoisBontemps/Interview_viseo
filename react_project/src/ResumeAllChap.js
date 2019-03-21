import React from 'react';
import { firebase, data } from './config';
import { userName } from './NameForm';

class ResumeAllChapter extends React.Component {
    state = { results: {} };

    getResultats = () => {
        for (let chapIndex = 1; chapIndex < Object.keys(data.chapters).length + 1; chapIndex++) {
            firebase
                .database()
                .ref('student/' + userName.name + '/' + 'chapter/' + chapIndex)
                .on(
                    'value',
                    snapshot => {
                        if (snapshot.val() != null) {
                            this.setState(prevState => ({
                                results: { ...prevState.results, [chapIndex]: snapshot.val() }
                            }));
                        }
                    },
                    function(errorObject) {
                        console.log('The read failed: ' + errorObject.code);
                    }
                );
        }
    };

    componentDidMount() {
        this.getResultats();
    }
    getTabMoy = () => {
        const { results } = this.state;
        const tabNote = [];
        let tabMoy = [];
        let temp = 0;

        for (let chapindex in results) {
            firebase
                .database()
                .ref('student/' + userName.name + '/' + 'chapter/' + chapindex)
                .on(
                    'value',
                    snapshot => {
                        if (snapshot.val() != null) {
                            for (let note in snapshot.val()) {
                                tabNote.push(parseInt(snapshot.val()[note]));
                            }
                        }
                    },
                    function(errorObject) {
                        console.log('The read failed: ' + errorObject.code);
                    }
                );
        }
        for (let i = 1; i < tabNote.length; i++) {
            if (isNaN(tabNote[i])) {
                tabMoy.push(temp);
                temp = 0;
            } else {
                temp += parseInt(tabNote[i]);
            }
        }
        tabMoy.push(temp);
        return tabMoy;
    };
    getTabAppr = () => {
        const { results } = this.state;
        let tabappr = [];

        for (let chapindex in results) {
            firebase
                .database()
                .ref('student/' + userName.name + '/' + 'chapter/' + chapindex)
                .on(
                    'value',
                    snapshot => {
                        if (snapshot.val() != null) {
                            tabappr.push(Object.values(snapshot.val())[0]);
                        }
                    },
                    function(errorObject) {
                        console.log('The read failed: ' + errorObject.code);
                    }
                );
        }
        return tabappr;
    };
    render() {
        const Moy = this.getTabMoy();
        const Appr = this.getTabAppr();
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1>Résume de l'interview de {userName.name}</h1>
                    <div>
                        {Appr.map((value, index) => (
                            <h4 key={index}>
                                chapitre {index + 1} : Moyenne {Moy[index]}
                                <br />
                                Appréciation : {value}
                            </h4>
                        ))}
                    </div>
                </div>
                <button onClick={this.handleClick}>Nouvelle Interview</button>
            </form>
        );
    }
}

export default ResumeAllChapter;
