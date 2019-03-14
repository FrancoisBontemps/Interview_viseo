import React from 'react';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Enter a Name', renderChapter: true };

    }
    dismiss() {
        const { unmountForm } = this.props;
        unmountForm();
    }

    handleChange =({ target }) => {
        this.setState({ value: target.value });
    }
    handleSubmit = (event) => {
        const { value } = this.state;
        event.preventDefault();
        localStorage.setItem('UserName', value);
        this.dismiss();
    }

    render() {
        const { value } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User :
                        <input type="text" color={'yellow'} value={value} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Valider" align="center" />
                </form>
            </div>
        );
    }
}

export default NameForm;
