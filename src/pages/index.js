import React from 'react';
import { render } from 'react-dom';

import routes from '../routes/index';
import Root from '../containers/common/Root';

export default () => {
    render(
        <Root routes={routes} />,
        document.getElementById('root')
    );
};
