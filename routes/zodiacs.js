import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import loader from '../lib/zodiac-loader';
import getTags from '../lib/getTags';
import getDateString from '../lib/getDateString';
import makeXml from '../lib/makeXML';
// import convertName from '../lib/zodiacNames';
import { names, convertName } from '../lib/zodiacNames';

const saveToFile = (fileName, data) => {
  const filePath = path.join('./public', fileName);
  return fs.promises.writeFile(filePath, data);
};

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
    // eslint-disable-next-line object-curly-newline
    await ctx.render('zodiacs', { name, horoscopes, keys, names, tags, date, zodiac });
  });
  router.get('xml', '/:zodiac/xml', async (ctx) => {
    const { zodiac } = ctx.params;
    const data = await loader(zodiac);
    const xmlString = makeXml(zodiac, data);
    // await saveToFile(`${zodiac}.xml`, xmlString);
    // console.log(path.join(__dirname, '..', '.gitignore'));
    // ctx.response.body = fs.createReadStream(path.join(__dirname, '..', 'public', `${zodiac}.xml`));
    // ctx.set('Content-disposition', `attachment; filename=${zodiac}.xml`);
    ctx.response.body = xmlString;
  });
};
