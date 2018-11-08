import React from 'react';

import TemplateLogin, { ITemplateLoginProps } from '@t-login';
import ViewBase, { IViewBaseProps } from '@v-base';

export interface IViewLoginProps extends IViewBaseProps {
    login: ITemplateLoginProps;
}

export default class ViewLogin extends React.Component<IViewLoginProps> {
    render(): JSX.Element {
        const { login, ...viewBaseProps } = this.props;

        return (
            <ViewBase {...viewBaseProps}>
                <TemplateLogin {...login} />
            </ViewBase>
        );
    }
}
