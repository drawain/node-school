const Koa = require('koa');
const Router = require('koa-router');

const initIndexController = require('./controllers/index');
const initTweetsController = require('./controllers/tweets');

class App {

  constructor(Koa, Router) {
    this._app = new Koa();
    this._router = new Router();
    this._bindMiddlewares();
  }

  listen(...args) {
    return this._app.listen.apply(this._app, args);
  }

  _bindMiddlewares() {
    // Egyszerű saját middleware amivel a requestek ideje mérhető
    this._app.use(async (ctx, next) => {
      let startTime = new Date().getTime();

      await next();

      let duration = new Date().getTime() - startTime;
      console.log(`> ${ctx.method} request to ${ctx.path} [${duration}ms]`);
    });


    initIndexController(this._app); // Egy megoldás router nélkül
    initTweetsController(this._app, this._router);

    this._app.use(this._router.middleware());

    // Utolsó middleware amire ha le tud csorogni a kérés, akkor 404-es oldalt fog beállítani
    this._app.use(async (ctx) => {
      ctx.body = 'Not found';
      ctx.status = 404;
    });
  }

  static create() {
    return new App(Koa, Router);
  }

}

module.exports = App;
