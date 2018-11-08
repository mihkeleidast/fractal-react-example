import React from 'react';

import classNames from 'classnames';

import Icon from '@icon';

if (process.env.webpack) {
    require('./select.scss');
}

export interface ISelectOption {
    label: string;
    value: string;
}

export interface ISelectProps {
    id: string;
    label: string;
    name: string;
    options: ISelectOption[];
    value?: string;
    type?: string;
    attributes?: React.SelectHTMLAttributes<HTMLSelectElement>;
    onChange?: (value: string) => void;
    invalid?: boolean;
    disabled?: boolean;
    error?: string;
    description?: string;
    labelClassName?: string;
    inputClassName?: string;
    modifier?: string;
    className?: string;
}

export interface ISelectState {
    value: string;
    prevValue: string;
}

export default class Select extends React.Component<ISelectProps, ISelectState> {
    static getDerivedStateFromProps(props: ISelectProps, state: ISelectState): ISelectState | null {
        if (typeof props.value !== 'undefined' && props.value !== state.prevValue) {
            return {
                value: props.value,
                prevValue: props.value,
            };
        }

        return null;
    }

    constructor(props: ISelectProps) {
        super(props);

        this.state = {
            value: props.value || '',
            prevValue: props.value || '',
        };
    }

    handleChange = (event: React.FormEvent<HTMLSelectElement>): void => {
        this.setState({
            value: event.currentTarget.value,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    renderError(): JSX.Element {
        return (
            <div className="select__error">
                {this.props.error}
            </div>
        );
    }

    renderDescription(): JSX.Element {
        return (
            <div className="select__description">
                {this.props.description}
            </div>
        );
    }

    renderLabel(): JSX.Element {
        const className = classNames('select__label', this.props.labelClassName);

        return (
            <label className={className} htmlFor={this.props.id}>
                {this.props.label}
            </label>
        );
    }

    renderOptions(): JSX.Element[] {
        return this.props.options.map((option: ISelectOption) => {
            return (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            );
        });
    }

    renderInput(): JSX.Element {
        const className = classNames('select__input', this.props.inputClassName);

        return (
            <select
                {...this.props.attributes}
                className={className}
                id={this.props.id}
                name={this.props.name}
                value={this.state.value}
                disabled={this.props.disabled}
                onChange={this.handleChange}
            >
                {this.renderOptions()}
            </select>
        );
    }

    render(): JSX.Element {
        const className = classNames(
            'select',
            {
                'is-dirty': this.state.value,
                'is-invalid': this.props.invalid,
                'is-disabled': this.props.disabled,
            },
            this.props.modifier,
            this.props.className,
        );

        return (
            <div className={className}>
                <div className="select__inner">
                    {this.renderInput()}
                    <Icon name="arrow-down" className="select__icon" />
                    {this.renderLabel()}
                </div>
                {this.props.error && this.renderError()}
                {this.props.description && this.renderDescription()}
            </div>
        );
    }
}
