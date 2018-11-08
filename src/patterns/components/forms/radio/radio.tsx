import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./radio.scss');
}

export interface IRadioProps {
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

export interface IRadioState {
    checked: boolean;
    prevChecked: boolean;
}

export default class Radio extends React.Component<IRadioProps, IRadioState> {
    static defaultProps: Partial<IRadioProps> = {
        checked: false,
    };

    static getDerivedStateFromProps(props: IRadioProps, state: IRadioState): IRadioState | null {
        if (typeof props.checked !== 'undefined' && props.checked !== state.prevChecked) {
            return {
                checked: props.checked,
                prevChecked: props.checked,
            };
        }

        return null;
    }

    constructor(props: IRadioProps) {
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
        const className = classNames('radio', this.props.modifier, this.props.className);

        return (
            <div className={className}>
                <input
                    {...this.props.attributes}
                    type="radio"
                    className="radio__input"
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    checked={this.state.checked}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                />
                <label htmlFor={this.props.id} className="radio__label">
                    <span className="radio__indicator" />
                    <span className="radio__text">{this.props.label}</span>
                </label>
            </div>
        );
    }
}
