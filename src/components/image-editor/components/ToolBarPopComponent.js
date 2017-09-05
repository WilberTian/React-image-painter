import React, { PureComponent } from 'react';

import ColorSelectorComponent from './ColorSelectorComponent';
import LinesizeSelectorComponent from './LinesizeSelectorComponent';

import './tool-bar-pop-component.less';

export default class ToolBarPopComponent extends PureComponent {
    render() {
        const { size, color, showDivider } = this.props;

        return (
            <div className="tool-bar-pop-component">
                { size && <LinesizeSelectorComponent /> }
                { showDivider && <span className="divider" /> }
                { color && <ColorSelectorComponent /> }
            </div>
        );
    }
}
