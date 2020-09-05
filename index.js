import path from 'path';
import _ from 'lodash';
import Koa from 'koa';
import bodyParser from 'koa-body-parser';
import serve from 'koa-static';
import koaLogger from 'koa-logger';
import Router from 'koa-router';
import session from 'koa-generic-session';
import flash from 'koa-better-flash';
import methodOverride from 'koa-methodoverride';
import Pug from 'koa-pug';
import addRoutes from './routes';

require('dotenv').config();

export default () => {
  const app = new Koa();
  app.keys = [process.env.APPKEY];
  app.use(session(app));
  app.use(bodyParser());
  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method; // eslint-disable-line
    }
    return null;
  }));
  app.use(flash());
  app.use(serve(path.join(__dirname, 'public')));

  app.use(koaLogger());
  const appRouter = new Router();

  addRoutes(appRouter);
  app.use(appRouter.allowedMethods());
  app.use(appRouter.routes());

  const pug = new Pug({
    viewPath: path.resolve(__dirname, 'views'),
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => appRouter.url(...args) },
    ],
  });

  pug.use(app);

  app.use((ctx, next) => {
    try {
      next();
    } catch (err) {
      // rollbar.error(err, ctx.request);
    }
  });

  return app;
};
