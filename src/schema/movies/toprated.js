const axios = require('axios');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { API_KEY, API_URL } = require('../../../config');
const { MovieSmallType, MovieDefaultArgsType } = require('./types');

const MovieTopRatedType = new GraphQLObjectType({
  name: 'MovieTopRated',
  description: 'Get the top rated movies on TMDb.',
  fields: {
    ...MovieSmallType,
  },
});

const MovieTopRatedQuery = {
  type: new GraphQLList(MovieTopRatedType),
  args: {
    ...MovieDefaultArgsType,
  },
  resolve(parentValue, { language = 'en-US', page = 1 }) {
    return axios
      .get(
        `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results);
  },
};

module.exports = {
  MovieTopRatedQuery,
};
