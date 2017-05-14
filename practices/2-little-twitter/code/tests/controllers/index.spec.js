const App = require('../../app');
const supertest = require('supertest');
const expect = require('chai').expect;

describe('Server Index Controller', () => {
  let request;

  beforeEach(() => {
    request = supertest.agent(App.create().listen());
  });

  context('GET /', () => {
    it('should return with an HTML index page', async () => {
      let result = await request.get('/');
      expect(result.statusCode).to.eql(200);
      expect(result.res.text).to.include('<title>Little Twitter!</title>');
    });
  });


  it('should return 404 for requesting not existing pages', async () => {
    let result = await request.get('/notexists');
    expect(result.statusCode).to.eql(404);
  });

});
