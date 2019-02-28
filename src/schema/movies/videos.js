const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLError,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');
const { LanguageType } = require('./types');

const MovieVideosType = new GraphQLObjectType({
  name: 'MovieVideos',
  description: 'Get the videos that have been added to a movie.',
  fields: {
    id: {
      type: GraphQLString,
    },
    iso_3166_1: {
      type: GraphQLString,
    },
    iso_639_1: {
      type: GraphQLString,
    },
    key: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    site: {
      type: GraphQLString,
    },
    size: {
      type: GraphQLInt,
    },
    type: {
      type: GraphQLString,
    },
  },
});

const MovieVideosQuery = {
  type: new GraphQLList(MovieVideosType),
  args: {
    id: {
      type: GraphQLInt,
    },
    language: {
      ...LanguageType,
    },
  },
  resolve(parentValue, { id, language = 'en-US' }) {
    return axios
      .get(
        `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${language}`,
      )
      .then(res => res.data.results)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  MovieVideosQuery,
};
