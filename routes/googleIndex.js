import _ from 'lodash';
import update from '../lib/updateGoogle';
import makeUrls from '../lib/makeUrlsToUpdate';

export default (router) => {
  router.get('gindex', '/google/index', async (ctx) => {
    const urls = makeUrls();
    const coll = await ctx.db.collection('serviceUsers');
    const users = await coll.find().toArray();
    users.map((u) => u.requests = 0);
    let time = 0;
    for (let link of urls) {
      const availableUsers = _.filter(users, (u) => u.requests < 190);
      const user = _.sample(availableUsers);
      setTimeout(() => update(user, link).then((res) => console.log(res.status)).catch((e) => console.log(e.message)), time);
      time += 200;
      user.requests += 1;
    };
    ctx.response.body = urls;
  });
};
