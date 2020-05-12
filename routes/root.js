import _ from 'lodash';
import { names } from '../lib/zodiacNames';

export default (router) => {
  router.get('root', '/', async (ctx) => {
    const keys = _.keys(names);
    await ctx.render('root', { keys, names });
  });
};
