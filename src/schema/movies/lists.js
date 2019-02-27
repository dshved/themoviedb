const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { LanguageType, PageType } = require('./types');

const MovieListsType = new GraphQLObjectType({
  name: 'MovieLists',
  description: 'Get a list of lists that this movie belongs to.',
  fields: {
    id: {
      type: GraphQLInt,
    },
    description: {
      type: GraphQLString,
    },
    favorite_count: {
      type: GraphQLInt,
    },
    item_count: {
      type: GraphQLInt,
    },
    iso_639_1: {
      type: GraphQLString,
    },
    list_type: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    poster_path: {
      type: GraphQLString,
    },
  },
});

const MovieListsQuery = {
  type: new GraphQLList(MovieListsType),
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
        `${API_URL}/movie/${id}/lists?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results);
  },
};

module.exports = {
  MovieListsQuery,
};
