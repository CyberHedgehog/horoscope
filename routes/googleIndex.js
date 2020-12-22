import _ from 'lodash';
import update from '../lib/updateGoogle';
import makeUrls from '../lib/makeUrlsToUpdate';

export default (router) => {
  router.get('gindex', '/google/index', async (ctx) => {
    const urls = makeUrls();
    const coll = await ctx.db.collection('serviceUsers');
    const logs = await ctx.db.collection('logs');
    const users = await coll.find().toArray();
    users.map((u) => u.requests = 0);
    let time = 0;
    const log = [];
    for (let link of urls) {
      const availableUsers = _.filter(users, (u) => u.requests < 190);
      const user = _.sample(availableUsers);
      setTimeout(() => update(user, link)
        .then((res) => logs.insertOne({ date: new Date(), link, user: user.project_id, status: res.status }))
        .catch((e) => logs.insertOne({ date: new Date(), link, user: user.project_id, error: e.message })), time);
      time += 200;
      user.requests += 1;
    };
    ctx.response.body = 'Started';
  });

  const filters = {
    'success': (logs) => logs.filter((l) => l.status),
    'error': (logs) => logs.filter((l) => l.error),
  };

  router.get('/google/logs', async (ctx) => {
    const logs = await ctx.db.collection('logs').find().toArray();
    if (ctx.query.filter) {
      const data = filters[ctx.query.filter](logs);
      await ctx.render('logs', { logs: data });
    }
    await ctx.render('logs', { logs });
  });

  router.get('/google/logs/delete', async (ctx) => {
    await ctx.db.collection('logs').deleteMany();
    ctx.response.body = 'Done';
  })
};
