import _ from 'lodash';
import loader from '../lib/zodiac-loader';
import getTags from '../lib/getTags';
import getDateString from '../lib/getDateString';
import makeXml from '../lib/makeXML';
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
    const tags = getTags(name.a);
    const date = getDateString();
    const horoscopes = await loader(zodiac);
    ctx.session[zodiac] = horoscopes;
    await ctx.render('zodiacs', { name, horoscopes, keys, names, tags, date, zodiac });
  });
  router.get('xml', '/:zodiac/xml', async (ctx) => {
    const { zodiac } = ctx.params;
    const data = await loader(zodiac);
    const xmlString = makeXml(zodiac, data);
    ctx.type = 'text/xml';
    ctx.response.body = xmlString;
  });
};
