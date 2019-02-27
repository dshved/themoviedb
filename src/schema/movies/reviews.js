const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const { LanguageType, PageType } = require('./types');
const { API_KEY, API_URL } = require('../../../config');

const MovieReviewsType = new GraphQLObjectType({
  name: 'MovieReviews',
  description: 'Get the user reviews for a movie.',
  fields: {
    id: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
  },
});

const MovieReviewsQuery = {
  type: new GraphQLList(MovieReviewsType),
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
        `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results);
  },
};

module.exports = {
  MovieReviewsQuery,
};
