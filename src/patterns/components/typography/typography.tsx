import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./typography.scss');
}

export interface ITypographyProps {
    modifier?: string;
    className?: string;
}

export default class Typography extends React.Component<ITypographyProps> {
    render() {
        const className = classNames('text', this.props.modifier, this.props.className);

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}
