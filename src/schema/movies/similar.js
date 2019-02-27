const axios = require('axios');
const { GraphQLObjectType, GraphQLList, GraphQLInt } = require('graphql');
const { API_KEY, API_URL } = require('../../../config');
const { MovieSmallType, LanguageType, PageType } = require('./types');

const MovieSimilarType = new GraphQLObjectType({
  name: 'MovieSimilar',
  description: `Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website.
  These items are assembled by looking at keywords and genres.`,
  fields: {
    ...MovieSmallType,
  },
});

const MovieSimilarQuery = {
  type: new GraphQLList(MovieSimilarType),
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
        `${API_URL}/movie/${id}/similar?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results);
  },
};

module.exports = {
  MovieSimilarQuery,
};
