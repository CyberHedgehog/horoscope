import root from './root';
import zodiacs from './zodiacs';

const controllers = [root, zodiacs];

export default (router) => controllers.forEach((f) => f(router));
