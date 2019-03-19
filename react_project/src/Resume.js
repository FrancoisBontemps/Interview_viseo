import React from 'react';

class Resume extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chapnum: props.chapnum, moyenne: props.moyenne, appreciation : '' };
    }
    dismiss() {
        const { ResumeUnmount } = this.props;
        ResumeUnmount();
    }
    handleChange = ({ target }) => {
        this.setState({ appreciation: target.value });
        };

    handleSubmit = event => {
        const {chapnum,appreciation} = this.state;
        const appreciationId = 'Appreciation' + chapnum;
        localStorage.setItem(appreciationId, appreciation);
        event.preventDefault();
        this.dismiss();
    };

    render() {
        const {appreciation} = this.state;
            return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1> Résumé Chapitre {this.state.chapnum}</h1>
                    <div>
                        Moyenne du Chapitre {this.state.chapnum} : {this.state.moyenne}
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
    )
    }
}
export default Resume;