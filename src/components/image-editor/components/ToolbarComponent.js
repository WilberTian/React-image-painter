import React, { PureComponent } from 'react';

import DomainMapper from '../../../utils/DomainMapper';

import ToolBarPopComponent from './ToolBarPopComponent';

import './tool-bar-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            activeTool: model.activeTool,
            penModel: model.pen,
            rectModel: model.rect,
            fontModel: model.font
        };
    },
    actionMapper: (action) => {
        return {
            changeActiveTool: action.changeActiveTool,
            backwardEditorInnerItem: action.backwardEditorInnerItem,
            forwardEditorInnerItem: action.forwardEditorInnerItem,
            resetEditor: action.resetEditor
        };
    }
};

@DomainMapper(mapper)
export default class ToolbarComponent extends PureComponent {
    _changeActiveTool(tool) {
        const { changeActiveTool } = this.props;
        changeActiveTool(tool);
    }

    _updateEditorContent(actionType) {
        const { backwardEditorInnerItem, forwardEditorInnerItem, resetEditor } = this.props;

        if (actionType === 'backward') {
            backwardEditorInnerItem();
        } else if (actionType === 'forward') {
            forwardEditorInnerItem();
        } else if (actionType === 'reset') {
            resetEditor();
        }
    }

    render() {
        const { activeTool } = this.props;

        const pen = require('../icons/pen.png');
        const rect = require('../icons/rect.png');
        const font = require('../icons/font.png');
        const backward = require('../icons/backward.png');
        const forward = require('../icons/forward.png');
        const reset = require('../icons/reset.png');

        return (
            /* eslint-disable jsx-a11y/no-static-element-interactions */
            <div className="tool-bar-component">
                <div
                  className={`tool-bar-item ${activeTool === 'pen' ? 'active' : ''}`}
                  onClick={() => { this._changeActiveTool('pen'); }}
                >
                    <img src={pen} alt="pen" />
                    <ToolBarPopComponent size color showDivider />
                </div>
                <div
                  className={`tool-bar-item ${activeTool === 'rect' ? 'active' : ''}`}
                  onClick={() => { this._changeActiveTool('rect'); }}
                >
                    <img src={rect} alt="rect" />
                    <ToolBarPopComponent size color showDivider />
                </div>
                <div
                  className={`tool-bar-item ${activeTool === 'font' ? 'active' : ''}`}
                  onClick={() => { this._changeActiveTool('font'); }}
                >
                    <img src={font} alt="font" />
                    <ToolBarPopComponent size={false} color showDivider={false} />
                </div>
                <div className="tool-bar-item" onClick={() => { this._updateEditorContent('backward'); }}>
                    <img src={backward} alt="backward" />
                </div>
                <div className="tool-bar-item" onClick={() => { this._updateEditorContent('forward'); }}>
                    <img src={forward} alt="forward" />
                </div>
                <div className="tool-bar-item" onClick={() => { this._updateEditorContent('reset'); }}>
                    <img src={reset} alt="reset" />
                </div>
            </div>
            /* eslint-enable jsx-a11y/no-static-element-interactions */
        );
    }
}
