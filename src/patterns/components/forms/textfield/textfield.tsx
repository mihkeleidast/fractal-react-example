import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./textfield.scss');
}

export interface ITextFieldProps {
    id: string;
    label: string;
    name: string;
    value?: string;
    type?: string;
    attributes?: React.InputHTMLAttributes<HTMLInputElement>;
    onChange?: (value: string) => void;
    element?: 'textarea';
    invalid?: boolean;
    disabled?: boolean;
    error?: string;
    description?: string;
    labelClassName?: string;
    inputClassName?: string;
    modifier?: string;
    className?: string;
}

export interface ITextFieldState {
    value: string;
    prevValue: string;
    focused: boolean;
}

export default class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
    static defaultProps: Partial<ITextFieldProps> = {
        type: 'text',
    };

    static getDerivedStateFromProps(props: ITextFieldProps, state: ITextFieldState): ITextFieldState | null {
        if (typeof props.value !== 'undefined' && props.value !== state.prevValue) {
            return {
                value: props.value,
                prevValue: props.value,
                focused: state.focused,
            };
        }

        return null;
    }

    constructor(props: ITextFieldProps) {
        super(props);

        this.state = {
            value: props.value || '',
            prevValue: props.value || '',
            focused: false,
        };
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            value: event.currentTarget.value,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    handleFocus = (): void => {
        this.setState({
            focused: true,
        });
    }

    handleBlur = (): void => {
        this.setState({
            focused: false,
        });
    }

    renderError(): JSX.Element {
        return (
            <div className="textfield__error">
                {this.props.error}
            </div>
        );
    }

    renderDescription(): JSX.Element {
        return (
            <div className="textfield__description">
                {this.props.description}
            </div>
        );
    }

    renderLabel(): JSX.Element {
        const className = classNames('textfield__label', this.props.labelClassName);

        return (
            <label className={className} htmlFor={this.props.id}>
                {this.props.label}
            </label>
        );
    }

    renderInput(): JSX.Element {
        const className = classNames('textfield__input', this.props.inputClassName);
        const InputElement = this.props.element || 'input';

        return (
            <InputElement
                {...this.props.attributes}
                className={className}
                type={this.props.type}
                id={this.props.id}
                name={this.props.name}
                value={this.state.value}
                disabled={this.props.disabled}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            />
        );
    }

    render(): JSX.Element {
        const className = classNames(
            'textfield',
            {
                'is-dirty': this.state.value,
                'is-focused': this.state.focused,
                'is-invalid': this.props.invalid,
                'is-disabled': this.props.disabled,
            },
            this.props.modifier,
            this.props.className,
        );

        return (
            <div className={className}>
                <div className="textfield__inner">
                    {this.renderInput()}
                    {this.renderLabel()}
                </div>
                {this.props.error && this.renderError()}
                {this.props.description && this.renderDescription()}
            </div>
        );
    }
}
