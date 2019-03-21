import React from 'react';
import { userName } from './NameForm';
import { data } from './config';

class Chapter extends React.Component {
    handleClick = () => {
        const { unmountChapter } = this.props;
        unmountChapter();
    };

    DisplayList() {
        const { chapnum } = this.props;
        const section = data.chapters['chapter' + chapnum].sections;
        const arr = section.map(val => {
            return data.sections[val].title;
        });
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
        const { chapnum } = this.props;
        return (
            <div>
                <h3>{userName.name}</h3>
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
