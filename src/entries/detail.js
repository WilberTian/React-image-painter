import detailPage from '../pages/detail';

detailPage();

if (module.hot) {
    module.hot.accept('../pages/detail', () => {
        const _new = require('../pages/detail').default;
        _new();
    });
}
