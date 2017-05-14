class TweetStore {

  constructor(tweets = []) {
    this._tweets = tweets;
  }

  items() {
    return this._tweets;
  }

  add(tweet) {
    this._tweets.push(tweet);
  }

}

module.exports = TweetStore;
