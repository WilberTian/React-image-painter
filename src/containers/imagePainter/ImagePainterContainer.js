import React, { PureComponent } from 'react';

import ImageEditorContainer from '../../components/image-editor/ImageEditorContainer';

import './image-painter-container.less';

export default class ImagePainterContainer extends PureComponent {
    render() {
        const bannerUrl = '/api/banner.jpg';

        return (
            <div className="image-painter-container">
                <ImageEditorContainer imgSrc={bannerUrl} containerWidth={500} />
            </div>
        );
    }
}
