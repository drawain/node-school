const App = require('../../app');
const supertest = require('supertest');
const expect = require('chai').expect;

describe('Server Tweets Controller', () => {
  let request;

  beforeEach(() => {
    request = supertest.agent(App.create().listen());
  });

  describe('GET /api/tweets', () => {

    it('should respond with empty array if there is no tweets stores', async () => {
      let result = await request.get('/api/tweets');

      expect(result.statusCode).to.eql(200);
      expect(result.body).to.eql([]);
    });

  });

  describe('POST /api/tweets', () => {

    it('should accept a valid tweet', async () => {
      let result = await request.post('/api/tweets')
        .send({ name: 'Draven', content: 'This is a tweet!' })
        .set('Accept', 'application/json');

      expect(result.statusCode).to.eql(201);
    });

    it('should save a valid tweet', async () => {
      let tweet = { name: 'Draven', content: 'This is a tweet!' };

      await request.post('/api/tweets')
        .send(tweet)
        .set('Accept', 'application/json');

      let result = await request.get('/api/tweets');

      expect(result.body).to.eql([tweet]);
    });

  });

});
