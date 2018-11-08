import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./languages.scss');
}

export interface ILanguagesItem {
    url: string;
    label: string;
    current?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface ILanguagesProps {
    items: ILanguagesItem[];
    modifier?: string;
    className?: string;
}

export default class Languages extends React.Component<ILanguagesProps> {
    renderItems(): JSX.Element[] {
        return this.props.items.map((item, index) => {
            const className = classNames(
                'languages__item',
                {
                    'is-current': item.current,
                },
            );

            return (
                <li
                    key={index}
                    className={className}
                >
                    <a
                        href={item.url}
                        className="languages__link"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </a>
                </li>
            );
        });
    }

    render(): JSX.Element {
        const className = classNames(
            'languages',
            this.props.modifier,
            this.props.className,
        );

        return (
            <nav className={className}>
                <ul className="languages__list">
                    {this.renderItems()}
                </ul>
            </nav>
        );
    }
}
