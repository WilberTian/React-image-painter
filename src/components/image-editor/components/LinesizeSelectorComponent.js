import React, { PureComponent } from 'react';

import DomainMapper from '../../../utils/DomainMapper';

import './linesize-selector-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            sizeModel: model[model.activeTool]
        };
    },
    actionMapper: (action) => {
        return {
            updatePainterPorp: action.updatePainterPorp
        };
    }
};

@DomainMapper(mapper)

export default class LinesizeSelectorComponent extends PureComponent {
    _changeSize(key, value) {
        const { updatePainterPorp } = this.props;
        updatePainterPorp(key, value);
    }

    render() {
        const { sizeModel } = this.props;

        return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            <div className="linesize-selector-component">
                { sizeModel.sizes && sizeModel.sizes.map((size, index) => {
                    return (<div key={index}
                      className="linesize-item-wrapper"
                      onClick={() => { this._changeSize('selectedSize', size); }}
                    >
                        <div
                          className={`
                              linesize-item
                              ${size === sizeModel.selectedSize ? 'active' : ''}
                          `}
                          style={{ width: `${size}px`, height: `${size}px` }}
                        />
                    </div>);
                }) }
            </div>
            /* eslint-enable jsx-a11y/no-static-element-interactions */
        );
    }
}
