import React from 'react';

import classNames from 'classnames';

let icons: any = null;

if (process.env.webpack) {
    require('./icon.scss');
    const req = require.context('./import/svg/', false, /^\.\/.*\.svg$/);
    icons = (req.keys()).reduce((glyphs, key) => {
        const match = key.match(new RegExp(/[^/]+(?=\.svg$)/));
        const filename = match && match[0];

        return {
            ...glyphs,
            ['' + filename]: req(key),
        };
    }, {});
}

export interface IIconProps {
    name: string;
    modifier?: string;
    className?: string;
}

export default class Icon extends React.Component<IIconProps, {}> {
    getHref(): string | undefined {
        if (icons && icons[this.props.name]) {
            return icons[this.props.name].symbol;
        }

        if (!process.env.webpack) {
            // this is only for fractal ssr
            return app.publicFolder + 'inc/svg/icons.svg#' + this.props.name;
        }
    }

    render(): JSX.Element {
        const className = classNames('icon', this.props.modifier, this.props.className);

        return (
            <svg className={className}>
                <use xlinkHref={this.getHref()} />
            </svg>
        );
    }
}
