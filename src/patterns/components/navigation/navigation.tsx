import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./navigation.scss');
}

export interface INavigationItem {
    url: string;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    current?: boolean;
}

export interface INavigationProps {
    items: INavigationItem[];
    className?: string;
}

export default class Navigation extends React.Component<INavigationProps> {
    renderItems(): JSX.Element[] {
        return this.props.items.map((item: INavigationItem, index: number) => {
            const className = classNames(
                'navigation__item',
                {
                    'is-current': item.current,
                },
            );

            return (
                <li className={className} key={index}>
                    <a href={item.url} className="navigation__link">{item.label}</a>
                </li>
            );
        });
    }
    render(): JSX.Element {
        const className = classNames('navigation', this.props.className);

        return (
            <nav className={className}>
                <ul className="navigation__list">
                    {this.renderItems()}
                </ul>
            </nav>

        );
    }
}
