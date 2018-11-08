import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./button.scss');
}

export interface IButtonProps {
    text: string;
    url?: string;
    modifier?: string;
    className?: string;
    type?: string;
}

export default class Button extends React.Component<IButtonProps, {}> {
    onClick() {
        console.log('tere');
    }

    render() {
        const ButtonTag = this.props.url ? 'a' : 'button';
        const className = classNames('button', this.props.modifier, this.props.className);

        return (
            <ButtonTag
                className={className}
                onClick={this.onClick}
                type={this.props.url ? undefined : this.props.type}
                href={this.props.url}
            >
                {this.props.text}
            </ButtonTag>
        );
    }
}
