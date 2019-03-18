import React from 'react';

class Resume extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chapnum: props.chapnum, moyenne : props.moyenne}
    }
    dismiss() {
        const {unmountResume} = this.props;
        unmountResume();
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.dismiss();
        console.log("clicker");
    }
    render() {
        return (
            <form className = "Form" onSubmit={this.handleSubmit}>
            <div >
            <h1> Résumé {this.state.chapnum}</h1>
        <div>
        Résultat {this.state.chapnum} : {this.state.moyenne} / 5
        </div>
        </div>
        <button onClick={this.handleSubmit} type="submit" value="Démarrez" align="center">Suivant</button>;
            </form>

    )
    }


}
export default Resume;