import React from 'react';

import Button, { IButtonProps } from '@button';
import Container from '@container';

export interface ITemplateLoginProps {
    button: IButtonProps;
}

export default class TemplateLogin extends React.Component<ITemplateLoginProps> {
    render(): JSX.Element {
        return (
            <Container>
                <Button {...this.props.button} />
            </Container>
        );
    }
}
