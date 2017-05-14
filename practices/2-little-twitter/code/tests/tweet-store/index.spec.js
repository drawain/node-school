const expect = require('chai').expect;
const TweetStore = require('../../libraries/tweet-store');

describe('Tweet Store', () => {

  describe('#items', () => {
    it('should return zero items on creation', () => {
      let store = new TweetStore();
      expect(store.items()).to.eql([]);
    });

    it('should return items passed at creation time', () => {
      let tweets = [{ name: 'user1', content: 'content1' }, { name: 'user2', content: 'content2' }];
      let store = new TweetStore(tweets);
      expect(store.items()).to.eql(tweets);
    });
  });

  describe('#add', () => {
    it('should add an item to the store', () => {
      let tweet = { name: 'user1', content: 'content1' };
      let store = new TweetStore();
      store.add(tweet);
      expect(store.items()).to.eql([tweet]);
    });
  });

});
