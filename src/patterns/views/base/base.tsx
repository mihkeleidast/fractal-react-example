import React from 'react';

import Header, { IHeaderProps } from '@m-header';
import Main from '@main';

export interface IViewBaseProps {
    header?: IHeaderProps;
}

export default class ViewBase extends React.Component<IViewBaseProps> {
    renderHeader(): JSX.Element | null {
        if (!this.props.header) {
            return null;
        }

        return (
            <Header {...this.props.header} />
        );
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                {this.props.header && this.renderHeader()}
                <Main>
                    {this.props.children}
                </Main>
            </React.Fragment>
        );
    }
}
