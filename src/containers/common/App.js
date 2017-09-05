import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './app.less';

class App extends PureComponent {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        const { children } = this.props;

        return (
            <div className="app-container">
                { children }
            </div>
        );
    }

}

export default App;
