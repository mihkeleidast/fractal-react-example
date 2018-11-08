import React from 'react';

if (process.env.webpack) {
    require('./reset.scss');
}

export default class Reset extends React.Component<{}, {}> {
    render() {
        return 'This component is not actually a React component.';
    }
}
