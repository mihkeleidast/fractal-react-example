import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./container.scss');
}

export interface IContainerProps {
    className?: string;
}

export default class Container extends React.Component<IContainerProps> {
    render(): JSX.Element {
        const className = classNames('container', this.props.className);

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}
