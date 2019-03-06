import React from 'react';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Enter a Name' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label Form>
                    User : <mspace />
                    <input type="text" color={'yellow'} value={this.state.value} onChange={this.handleChange} />
                </label>
                <br />
                <br />
                <input type="submit" value="Valider" align="center" />
            </form>
        );
    }
}

export default NameForm;
