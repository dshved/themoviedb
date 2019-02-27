const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { MoviesQuery } = require('./movies');
const { ReviewsQuery } = require('./reviews');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...MoviesQuery,
    ...ReviewsQuery,
  },
});

module.exports = {
  schema: new GraphQLSchema({
    query: RootQuery,
  }),
};
