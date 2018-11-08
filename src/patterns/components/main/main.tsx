import React from 'react';

if (process.env.webpack) {
    require('./main.scss');
}

export default class Main extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main">
                {this.props.children}
            </div>
        );
    }
}
