import React from 'react';
import * as firebase from 'firebase';

class Resume extends React.Component {
    state = { appreciation: '' };

    dismiss() {
        const { ResumeUnmount } = this.props;
        ResumeUnmount();
    }
    handleChange = ({ target }) => {
        this.setState({ appreciation: target.value });
    };

    handleSubmit = event => {
        const { chapnum, username, moyenne } = this.props;
        const { appreciation } = this.state;
        const obj = {};
        const str = 'chapter' + chapnum.toString();
        obj[str] = moyenne;
        firebase
            .database()
            .ref('student/' + username)
            .update(obj);
        const appreciationId = 'Appreciation' + chapnum;
        localStorage.setItem(appreciationId, appreciation);
        event.preventDefault();
        this.dismiss();
    };

    render() {
        const { appreciation } = this.state;
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1> Résumé Chapitre {this.props.chapnum}</h1>
                    <div>
                        Moyenne du Chapitre {this.props.chapnum} : {this.props.moyenne}
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
