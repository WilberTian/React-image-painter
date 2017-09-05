import React, { PureComponent } from 'react';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import ImageEditorDomian from './ImageEditorDomian';

import ToolbarComponent from './components/ToolbarComponent';
import EditorComponent from './components/EditorComponent';

import './image-editor-container.less';

const mapper = {
    modelMapper: (model) => {
        return {
            editorObj: model.editorObj
        };
    },
    actionMapper: () => {}
};

@DomainComponentCreator(ImageEditorDomian)
@DomainMapper(mapper)
export default class ImageEditorContainer extends PureComponent {
    render() {
        return (
            <div className="image-editor-container">
                <EditorComponent imgSrc={this.props.imgSrc} containerWidth={this.props.containerWidth} />
                <ToolbarComponent />
            </div>
        );
    }
}
