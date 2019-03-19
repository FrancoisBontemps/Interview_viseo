import React from 'react';

class Chapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chapnum: props.chapnum, data: props.data};
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
        const {chapnum,data} = this.state;
        let section = data.chapters['chapter'+chapnum].sections;
        for (let val of section) {
            let valeur = data.sections[val];

            arr.push(valeur.title);
        }
        return (
            <div>
                {arr.map((value, index) => (
                    <h4 key={index}>
                        {' '}
                        {1+parseInt(Object.keys(section)[index])} : {value}{' '}
                    </h4>
                ))}
            </div>
        );
    }

    render() {
        const { chapnum, data } = this.state;
        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>Chapitre  {chapnum} : {data.chapters['chapter'+chapnum].title}</h1>
                <div>{this.DisplayList()}</div>
                <button onClick={this.handleClick}>Démarrez</button>
            </div>
        );
    }
}
export default Chapter;
