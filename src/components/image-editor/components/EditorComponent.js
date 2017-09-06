import React, { PureComponent } from 'react';

import { fabric } from 'fabric';

import DomainMapper from '../../../utils/DomainMapper';

import './editor-component.less';

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
            setEditorObj: action.setEditorObj,
            addEditorInnerItem: action.addEditorInnerItem
        };
    }
};

@DomainMapper(mapper)
export default class EditorComponent extends PureComponent {
    componentDidMount() {
        const { imgSrc, containerWidth, setEditorObj } = this.props;

        const editor = new fabric.Canvas('editor');
        // disable group selection
        editor.selection = false;
        this._editor = editor;

        setEditorObj(editor);

        editor.setBackgroundImage(imgSrc);

        const img = new Image();
        img.onload = () => {
            const imgInstance = new fabric.Image(img);
            editor.setWidth(img.width);
            editor.setHeight(img.height);

            // zoom the canvas based on the container size
            if (img.width > containerWidth) {
                const zoomFactor = containerWidth / img.width;
                editor.setZoom(zoomFactor);
                editor.setWidth(img.width * zoomFactor);
                editor.setHeight(img.height * zoomFactor);
            }

            editor.setBackgroundImage(imgInstance);

            this._initImageEditor();
        };
        img.src = imgSrc;
    }

    componentDidUpdate() {
        this._initImageEditor();
    }

    _initImageEditor() {
        const { activeTool, penModel, rectModel, fontModel, addEditorInnerItem } = this.props;

        this._editor.off('mouse:down');
        this._editor.off('mouse:move');
        this._editor.off('mouse:up');
        this._editor.off('object:moving');
        this._editor.off('path:created');
        this._editor.off('object:modified');
        this._editor.off('object:added');
        this._editor.off('selection:cleared');

        this._editor.on('object:added', (o) => {
            addEditorInnerItem(o.target);
        });

        this._editor.discardActiveObject();

        if (activeTool === 'pen') {
            this._editor.isDrawingMode = true;
            this._editor.freeDrawingBrush.color = penModel.selectedColor;
            this._editor.freeDrawingBrush.width = parseInt(penModel.selectedSize, 10);

            this._editor.on('path:created', (e) => {
                const path = e.path;
                path.selectable = false;
            });
        } else if (activeTool === 'rect') {
            this._editor.isDrawingMode = false;
            let rectangle = null;
            let isDrawing = false;
            let origX;
            let origY;

            this._editor.on('mouse:down', (o) => {
                if (this._editor.getActiveObject() || this._editor.getActiveGroup()) {
                    return;
                }

                const pointer = this._editor.getPointer(o.e);

                isDrawing = true;
                origX = pointer.x;
                origY = pointer.y;
            });

            this._editor.on('mouse:move', (o) => {
                if (!isDrawing) return;
                const pointer = this._editor.getPointer(o.e);

                if (rectangle === null) {
                    rectangle = new fabric.Rect({
                        left: origX,
                        top: origY,
                        width: pointer.x - origX,
                        height: pointer.y - origY,
                        angle: 0,
                        fill: 'transparent',
                        stroke: rectModel.selectedColor,
                        strokeWidth: parseInt(rectModel.selectedSize, 10)
                    });

                    this._editor.add(rectangle);
                }

                if (origX > pointer.x) {
                    rectangle.set({ left: Math.abs(pointer.x) });
                }
                if (origY > pointer.y) {
                    rectangle.set({ top: Math.abs(pointer.y) });
                }

                rectangle.set({ width: Math.abs(origX - pointer.x) });
                rectangle.set({ height: Math.abs(origY - pointer.y) });
                rectangle.setCoords();
                this._editor.renderAll();
            });

            this._editor.on('mouse:up', () => {
                isDrawing = false;
                rectangle = null;
            });

            this._editor.on('object:moving', () => {
                isDrawing = false;
            });

            this._editor.on('object:modified', (e) => {
                const obj = e.target;
                if (obj.type === 'rect') {
                    obj.set('width', obj.scaleX * obj.width);
                    obj.set('height', obj.scaleY * obj.height);
                    obj.set('scaleX', 1);
                    obj.set('scaleY', 1);
                }
            });
        } else if (activeTool === 'font') {
            let readyToAddText = true;
            this._editor.isDrawingMode = false;

            this._editor.on('selection:cleared', () => {
                readyToAddText = false;
            });

            this._editor.on('mouse:up', (o) => {
                const activeObject = this._editor.getActiveObject();
                if (readyToAddText && !activeObject) {
                    const pointer = this._editor.getPointer(o.e);
                    const fabicText = new fabric.IText('', {
                        left: pointer.x,
                        top: pointer.y
                    });
                    fabicText.set({ fill: fontModel.selectedColor });
                    this._editor.add(fabicText);
                    this._editor.setActiveObject(fabicText);
                    fabicText.enterEditing();
                } else {
                    readyToAddText = true;
                }
            });
        }
    }

    render() {
        return (
            <div className="editor-component">
                <canvas id="editor" />
            </div>
        );
    }
}
