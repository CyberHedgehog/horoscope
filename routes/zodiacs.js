import _ from 'lodash';
import loader from '../lib/zodiac-loader';
// import convertName from '../lib/zodiacNames';
import { names, convertName } from '../lib/zodiacNames';

export default (router) => {
  router.get('zodiac', '/:zodiac', async (ctx) => {
    const { zodiac } = ctx.params;
    const name = convertName(zodiac);
    const keys = _.keys(names);
    if (!name) {
      await ctx.render('root', { keys, names });
      return;
    }
    console.log(zodiac);
    const horoscopes = await loader(zodiac);
    // eslint-disable-next-line object-curly-newline
    await ctx.render('zodiacs', { name, horoscopes, keys, names });
  });
};
