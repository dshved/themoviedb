const axios = require('axios');
const { GraphQLObjectType, GraphQLList, GraphQLError } = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { MovieSmallType, MovieDefaultArgsType } = require('./types');

const MovieUpcomingType = new GraphQLObjectType({
  name: 'MovieUpcoming',
  description: `
    Get a list of upcoming movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.
    You can optionally specify a region prameter which will narrow the search to only look for theatrical release dates within the specified country.`,
  fields: {
    ...MovieSmallType,
  },
});

const MovieUpcomingQuery = {
  type: new GraphQLList(MovieUpcomingType),
  args: {
    ...MovieDefaultArgsType,
  },
  resolve(parentValue, { language = 'en-US', page = 1 }) {
    return axios
      .get(
        `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results)
      .catch(({ res }) => new GraphQLError(res.data));
  },
};

module.exports = {
  MovieUpcomingQuery,
};
