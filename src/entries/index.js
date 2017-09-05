import indexPage from '../pages/index';

indexPage();

if (module.hot) {
    module.hot.accept('../pages/index', () => {
        const _new = require('../pages/index').default;
        _new();
    });
}
