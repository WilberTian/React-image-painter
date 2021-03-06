import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DomainCreator from './DomainCreator';

const DomainComponentCreator = (domainObject) => {
    return (WrappedComponent) => {
        const getDisplayName = (_WrappedComponent) => {
            return _WrappedComponent.displayName ||
                _WrappedComponent.name ||
                'Component';
        };

        class DomainComponent extends Component {
            static displayName = `HOC_${getDisplayName(WrappedComponent)}`;

            constructor(props) {
                super(props);

                this.domain = DomainCreator(domainObject);
            }

            getChildContext() {
                return {
                    domain: this.domain
                };
            }

            render() {
                return <WrappedComponent {...this.props} />;
            }
        }

        DomainComponent.childContextTypes = {
            domain: PropTypes.object
        };

        return DomainComponent;
    };
};

export default DomainComponentCreator;
