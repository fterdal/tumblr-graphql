/* eslint camelcase:0 */
const tumblr = require('tumblr.js');

let client;
try {
  require('../../secrets');
  client = tumblr.createClient({
    credentials: {
      consumer_key: process.env.TUMBLR_COMSUMER_KEY,
      consumer_secret: process.env.TUMBLR_COMSUMER_SECRET,
      token: process.env.TUMBLR_TOKEN,
      token_secret: process.env.TUMBLR_TOKEN_SECRET,
    },
    returnPromises: true,
  });
} catch(err) {
  console.error(`Please include a secrets.js file at the top level of the project directory with the Tumblr consumer key and secret`);
}

const resolvers = {
  Query: {
    blogByName(_, {name}) {
      return client.blogInfo(name, (err, data) => {
        if (err) throw new Error(err);
        return data.blog;
      })
      .then(data => {
        // console.log('data', data);
        return data.blog;
      })
      .catch(error => console.error(error));
    }
  }
};

module.exports = resolvers;
