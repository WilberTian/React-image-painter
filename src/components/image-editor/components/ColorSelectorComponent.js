import React, { PureComponent } from 'react';
import DomainMapper from '../../../utils/DomainMapper';

import './color-selector-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            colorModel: model[model.activeTool]
        };
    },
    actionMapper: (action) => {
        return {
            updatePainterPorp: action.updatePainterPorp
        };
    }
};

@DomainMapper(mapper)
export default class ColorSelectorComponent extends PureComponent {
    _changeColor(key, value) {
        const { updatePainterPorp } = this.props;
        updatePainterPorp(key, value);
    }

    render() {
        const { colorModel } = this.props;

        return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            <div className="color-selector-component">
                { colorModel.colors && colorModel.colors.map((color, index) => {
                    return (<div
                      key={index}
                      className={`color-item ${color === colorModel.selectedColor ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => { this._changeColor('selectedColor', color); }}
                    />);
                }) }
            </div>
            /* eslint-enable jsx-a11y/no-static-element-interactions */
        );
    }
}
