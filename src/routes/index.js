import App from '../containers/common/App';
import ImagePainterContainer from '../containers/imagePainter/ImagePainterContainer';
import NotFound from './NotFound';

const notFountRoute = {
    path: '*',
    component: NotFound,
};

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: ImagePainterContainer,
    },
    childRoutes: [
        notFountRoute
    ]
};

export default route;
