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
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));

  // ~~~~~~~ Our very own GraphQL API ~~~~~~~
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // sends index.html
  // app.use('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  // })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  });
}

const startListening = () => {
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

if (require.main === module) {
  createApp();
  startListening();
}
