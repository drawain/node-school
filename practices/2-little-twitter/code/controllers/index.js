const send = require('koa-send');

module.exports = (app) => {

  // Normál custom middleware-es megoldás,
  // a tweets controllerben egy fejlettebb/egyszerűbb van
  app.use(async (ctx, next) => {
    if (ctx.method === 'GET' && ctx.path === '/') return await send(ctx, 'views/index.html');
    else await next();
  });

};

