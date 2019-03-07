import React from 'react';
import Chapter from './Chapter';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Enter a Name', renderChapter: true };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }
    dismiss() {
        this.props.unmountMe();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('UserName', this.state.value);
        this.dismiss();
    }

    handleChildUnmount() {
        this.setState({ renderChapter: false });
    }

    render() {
        let name = localStorage.getItem('UserName');
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label Form>
                        User : <mspace />
                        <input type="text" color={'yellow'} value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Valider" align="center" />
                </form>
            </div>
        );
    }
}

export default NameForm;
