import React from 'react';

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chapnum: props.chapnum, sections: props.sections };
    }
    dismiss() {
        const { unmountChapter } = this.props;
        unmountChapter();
    }
    handleClick = () => {
        this.dismiss();
    };

    DisplayList() {
        let arr = new Array();
        const { chapnum, data } = this.props;
        let section = data.chapters['chapter' + chapnum].sections;
        for (let val of section) {
            arr.push(data.sections[val].title);
        }
    DisplayList() {
        const { chapnum, data } = this.props;
        const section = data.chapters['chapter' + chapnum].sections;
        const arr = section.map(val =>{return data.sections[val].title});
        return (
            <div>
                {arr.map((value, index) => (
                    <h4 key={index}>
                        Section {1 + parseInt(Object.keys(section)[index])} : {value}{' '}
                    </h4>
                ))}
            </div>
        );
    }

    render() {
        const { chapnum, data } = this.props;
        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>
                    Chapitre {chapnum} : {data.chapters['chapter' + chapnum].title}
                </h1>
                <div>{this.DisplayList()}</div>
                <button onClick={this.handleClick}>Démarrez</button>
            </div>
        );
    }
}
export default Chapter;
