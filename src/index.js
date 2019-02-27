const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const cors = require('cors');
const { schema } = require('./schema');

const app = express();

app.use(cors());

const HOME_PATH = '/graphiql';
const URL = 'http://localhost';
const PORT = 4000;

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use(
  HOME_PATH,
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.listen(PORT, () => {
  console.log(`Visit ${URL}:${PORT}${HOME_PATH}`);
});
