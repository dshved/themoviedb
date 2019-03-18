const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { MoviesQuery } = require('./movies');
const { ReviewsQuery } = require('./reviews');
const { PeopleQuery } = require('./people');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...MoviesQuery,
    ...ReviewsQuery,
    ...PeopleQuery,
  },
});

module.exports = {
  schema: new GraphQLSchema({
    query: RootQuery,
  }),
};
