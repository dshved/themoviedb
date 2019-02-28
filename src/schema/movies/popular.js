const axios = require('axios');
const { GraphQLObjectType, GraphQLList, GraphQLError } = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { MovieSmallType, MovieDefaultArgsType } = require('./types');

const MoviePupularType = new GraphQLObjectType({
  name: 'MoviePopular',
  description:
    'Get a list of the current popular movies on TMDb. This list updates daily.',
  fields: {
    ...MovieSmallType,
  },
});

const MoviePopularQuery = {
  type: new GraphQLList(MoviePupularType),
  args: {
    ...MovieDefaultArgsType,
  },
  resolve(parentValue, { language = 'en-US', page = 1 }) {
    return axios
      .get(
        `${API_URL}/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results)
      .catch(({ res }) => new GraphQLError(res.data));
  },
};

module.exports = {
  MoviePopularQuery,
};
