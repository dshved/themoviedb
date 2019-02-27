const axios = require('axios');
const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { MovieSmallType, LanguageType, PageType } = require('./types');

const MovieRecommendationsType = new GraphQLObjectType({
  name: 'MovieRecommendations',
  description: 'Get a list of recommended movies for a movie.',
  fields: {
    ...MovieSmallType,
  },
});

const MovieRecommendationsQuery = {
  type: new GraphQLList(MovieRecommendationsType),
  args: {
    id: {
      type: GraphQLInt,
    },
    language: {
      ...LanguageType,
    },
    page: {
      ...PageType,
    },
  },
  resolve(parentValue, { id, language = 'en-US', page = 1 }) {
    return axios
      .get(
        `${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results);
  },
};

module.exports = {
  MovieRecommendationsQuery,
};
