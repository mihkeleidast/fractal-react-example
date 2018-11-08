import React from 'react';

import classNames from 'classnames';

import Icon from '@icon';

if (process.env.webpack) {
    require('./check.scss');
}

export interface ICheckProps {
    label: string;
    id: string;
    name: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    attributes?: React.InputHTMLAttributes<HTMLInputElement>;
    onChange?: (checked: boolean) => void;
    modifier?: string;
    className?: string;
}

export interface ICheckState {
    checked: boolean;
    prevChecked: boolean;
}

export default class Check extends React.Component<ICheckProps, ICheckState> {
    static defaultProps: Partial<ICheckProps> = {
        checked: false,
    };

    static getDerivedStateFromProps(props: ICheckProps, state: ICheckState): ICheckState | null {
        if (typeof props.checked !== 'undefined' && props.checked !== state.prevChecked) {
            return {
                checked: props.checked,
                prevChecked: props.checked,
            };
        }

        return null;
    }

    constructor(props: ICheckProps) {
        super(props);

        this.state = {
            checked: props.checked || false,
            prevChecked: props.checked || false,
        };
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const isChecked: boolean = event.currentTarget.checked;

        this.setState({
            checked: isChecked,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.checked);
            }
        });
    }

    render(): JSX.Element {
        const className = classNames('check', this.props.modifier, this.props.className);

        return (
            <div className={className}>
                <input
                    {...this.props.attributes}
                    type="checkbox"
                    className="check__input"
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    checked={this.state.checked}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                />
                <label htmlFor={this.props.id} className="check__label">
                    <span className="check__indicator">
                        <Icon className="check__icon" name="check" />
                    </span>
                    <span className="check__text">{this.props.label}</span>
                </label>
            </div>
        );
    }
}
