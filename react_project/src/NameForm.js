import React, { createContext, Component } from 'react'; // on importe createContext qui servira à la création d'un ou plusieurs contextes

export const UserContext = createContext({
    username: ''
});
class NameForm extends React.Component {
    state = { username: '' };

    dismiss() {
        const { FormUnmount } = this.props;
        FormUnmount();
    }

    handleChange = ({ target }) => {
        this.setState({ username: target.value });
    };

    handleSubmit = event => {
        const { username } = this.state;
        const { setUsername } = this.props;
        setUsername(username);
        event.preventDefault();
        localStorage.setItem('UserName', username);
        this.dismiss();
    };

    render() {
        const { username } = this.state;
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
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
            </UserContext.Provider>
        );
    }
}

export default NameForm;
