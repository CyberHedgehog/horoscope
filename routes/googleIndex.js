import _ from 'lodash';
import gUpdate from '../lib/updateGoogle';
import makeUrls from '../lib/makeUrlsToUpdate';

export default (router) => {
  router.get('gindex', '/google/index', async (ctx) => {
    const urls = makeUrls();
    const coll = await ctx.db.collection('serviceUsers');
    const users = await coll.find().toArray();
    const chunkSize = Math.ceil(urls.length / users.length);
    const chuncked = _.chunk(urls, chunkSize);
    // chuncked.forEach((e) => console.log(e.length));
    const promises = _.flatten(chuncked.forEach((elem, index) => gUpdate(users[index], elem)));
    // const result = await Promise.all(promises);
    console.log(promises);
    ctx.response.body = 'lol';
  });
};
