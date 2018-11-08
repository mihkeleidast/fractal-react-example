import React from 'react';

import Container from '@container';
import Languages, { ILanguagesProps } from '@languages';
import Navigation, { INavigationProps } from '@navigation';

if (process.env.webpack) {
    require('./header.scss');
}

export interface IHeaderProps {
    navigation: INavigationProps;
    languages: ILanguagesProps;
}

export default class Header extends React.Component<IHeaderProps> {
    render(): JSX.Element {
        return (
            <header className="header">
                <Container>
                    <div className="header__inner">
                        <Navigation {...this.props.navigation} />
                        <Languages {...this.props.languages} />
                    </div>
                </Container>
            </header>
        );
    }
}
