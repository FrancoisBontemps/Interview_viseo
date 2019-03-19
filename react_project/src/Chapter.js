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

    DisplayList(secs) {
        return (
            <div>
                {Object.values(secs)
                    .map(value => value.title)
                    .map((value, index) => (
                        <h4 key={index}>
                            {' '}
                            {Object.keys(secs)[index]} : {value}{' '}
                        </h4>
                    ))}
            </div>
        );
    }

    render() {
        const { chapnum, sections } = this.state;

        return (
            <div>
                <h3>{localStorage.getItem('UserName')}</h3>
                <h1>{chapnum}</h1>
                <div>{this.DisplayList(sections)}</div>
                <button onClick={this.handleClick}>Démarrez</button>
            </div>
        );
    }
}
export default Chapter;
