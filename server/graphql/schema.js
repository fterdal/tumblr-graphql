const { makeExecutableSchema } = require('graphql-tools');
const requireText = require('require-text');
const typeDefs = requireText('./typeDefs.graphql', require);
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
