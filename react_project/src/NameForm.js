import React from 'react';
import * as firebase from 'firebase';

export const userName = { name: '' };

class NameForm extends React.Component {
    state = { username: '' };

    handleChange = ({ target }) => {
        this.setState({ username: target.value });
    };

    handleSubmit = () => {
        const { username } = this.state;
        const { FormUnmount } = this.props;
        localStorage.setItem('UserName', username);
        userName.name = username;
        firebase
            .database()
            .ref('student/' + username)
            .update({
                name: username
            });

        FormUnmount();
    };

    render() {
        const { username } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User :
                        <input
                            type="text"
                            color={'yellow'}
                            value={username}
                            onChange={this.handleChange}
                            placeholder="Enter a username"
                        />
                    </label>
                    <br />
                    <input type="submit" value="Valider" align="center" />
                </form>
            </div>
        );
    }
}

export default NameForm;
