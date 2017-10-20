const fetch = require('node-fetch');

const resolvers = {
  Query: {
    blogByIdentifier(_, args) {
      return {
        title: 'This is a title',
        posts: 3,
      }
    }
  }
};

module.exports = resolvers;
