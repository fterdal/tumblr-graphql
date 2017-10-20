const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./graphql/schema');
const PORT = process.env.PORT || 8080;
const app = express();
module.exports = app;

const createApp = () => {

  // Connects to Tumblr API
  try {
    require('../secrets');
  } catch(err) {
    console.error(`Please include a secrets.js file at the top level of the project directory with the Tumblr consumer key and secret`);
  }

  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));

  // GraphQL API
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  });
}

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
}

if (require.main === module) {
  createApp();
  startListening();
}
