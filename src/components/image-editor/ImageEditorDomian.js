const domain = {

    model: {
        activeTool: 'pen',

        pen: {
            sizes: ['4', '8', '12'],
            selectedSize: '4',
            colors: ['#ff3440', '#ffcf50', '#00a344', '#0da9d6', '#999', '#000', '#fff'],
            selectedColor: '#ff3440'
        },
        rect: {
            sizes: ['4', '8', '12'],
            selectedSize: '4',
            colors: ['#ff3440', '#ffcf50', '#00a344', '#0da9d6', '#999', '#000', '#fff'],
            selectedColor: '#ff3440'
        },
        font: {
            colors: ['#ff3440', '#ffcf50', '#00a344', '#0da9d6', '#999', '#000', '#fff'],
            selectedColor: '#ff3440'
        },

        editorObj: null,
        editorInnerItems: [],
        deletedEditorInnerItems: []
    },

    action: {
        changeActiveTool: (tool) => {
            if (tool !== '') {
                domain.dispatch((model) => {
                    return {
                        ...model,
                        activeTool: tool
                    };
                });
            }
        },

        updatePainterPorp: (key, value) => {
            domain.dispatch((model) => {
                const dim = model.activeTool;
                const temp = Object.assign({}, model[dim], { [key]: value });

                return {
                    ...model,
                    [dim]: temp
                };
            });
        },

        setEditorObj: (editorObj) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    editorObj,
                    editorInnerItems: [],
                    deletedEditorInnerItems: []
                };
            });
        },

        addEditorInnerItem: (item) => {
            const editorInnerItems = domain.getCurrentModel().editorInnerItems;

            if (item) {
                domain.dispatch((model) => {
                    return {
                        ...model,
                        editorInnerItems: editorInnerItems.concat(item),
                    };
                });
            }
        },

        backwardEditorInnerItem: () => {
            const editorObj = domain.getCurrentModel().editorObj;
            const editorInnerItems = domain.getCurrentModel().editorInnerItems;
            const deletedEditorInnerItems = domain.getCurrentModel().deletedEditorInnerItems;

            const previousStep = editorInnerItems.pop();
            if (previousStep) {
                editorObj.remove(previousStep);

                domain.dispatch((model) => {
                    return {
                        ...model,
                        editorInnerItems,
                        deletedEditorInnerItems: deletedEditorInnerItems.concat(previousStep)
                    };
                });
            }
        },

        forwardEditorInnerItem: () => {
            const editorObj = domain.getCurrentModel().editorObj;
            const editorInnerItems = domain.getCurrentModel().editorInnerItems;
            const deletedEditorInnerItems = domain.getCurrentModel().deletedEditorInnerItems;

            const nextStep = deletedEditorInnerItems.pop();
            if (nextStep) {
                editorObj.add(nextStep);

                domain.dispatch((model) => {
                    return {
                        ...model,
                        editorInnerItems: editorInnerItems.concat(nextStep),
                        deletedEditorInnerItems
                    };
                });
            }
        },

        resetEditor: () => {
            const editorObj = domain.getCurrentModel().editorObj;
            domain.getCurrentModel().editorInnerItems.forEach((item) => {
                editorObj.remove(item);
            });

            domain.dispatch((model) => {
                return {
                    ...model,
                    editorInnerItems: [],
                    deletedEditorInnerItems: []
                };
            });
        }
    }
};

export default domain;
