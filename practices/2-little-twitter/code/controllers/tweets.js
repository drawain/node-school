const bodyParser = require('koa-body')();
const TweetStore = require('../libraries/tweet-store');

module.exports = (app, router) => {

  let tweets = new TweetStore();

  router.get('/api/tweets', async (ctx) => {
    ctx.body = tweets.items();
  });

  router.post('/api/tweets', bodyParser, async (ctx) => {
    const tweet = ctx.request.body;
    tweets.add(tweet);
    ctx.body = tweet;
    ctx.status = 201;
  });

};
