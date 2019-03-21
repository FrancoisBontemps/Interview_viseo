import React from 'react';

class ResumeAllChapter extends React.Component {
    display() {
        const { tabNote, tabAppreciation } = this.props;
        return (
            <div>
                <div>
                    {' '}
                    {tabNote.map((value, index) => (
                        <h4 key={index}>
                            Chapitre {index + 1} : Moyenne {value} <br />
                            Note : {tabAppreciation[index]}
                        </h4>
                    ))}

                </div>
            </div>
        );
    }

    render() {
        return (
            <form className="Form" onSubmit={this.handleSubmit}>
                <div>
                    <h1>Résume de l'interview de {localStorage.getItem('UserName')}</h1>

                    <div>{this.display()}</div>
                </div>
            </form>
        );
    }
}

export default ResumeAllChapter;
