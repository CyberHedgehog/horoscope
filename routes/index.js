import root from './root';
import zodiacs from './zodiacs';
import googelIndex from './googleIndex';

const controllers = [root, zodiacs, googelIndex];

export default (router) => controllers.forEach((f) => f(router));
