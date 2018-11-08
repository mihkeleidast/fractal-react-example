import React from 'react';

import classNames from 'classnames';

import TextField, { ITextFieldProps } from '@textfield';

if (process.env.webpack) {
    require('./textarea.scss');
}

export default class TextArea extends React.Component<ITextFieldProps, {}> {
    render(): JSX.Element {
        const className = classNames('textarea', this.props.modifier, this.props.className);

        return (
            <TextField
                {...this.props}
                className={className}
                inputClassName="textarea__input"
                element="textarea"
            />
        );
    }
}
