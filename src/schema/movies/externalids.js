const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLError,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const MovieExternalIdsType = new GraphQLObjectType({
  name: 'MovieExternalIds',
  description:
    'Get the external ids for a movie. We currently support the following external sources.',
  fields: {
    id: {
      type: GraphQLInt,
    },
    imdb_id: {
      type: GraphQLString,
    },
    facebook_id: {
      type: GraphQLString,
    },
    instagram_id: {
      type: GraphQLString,
    },
    twitter_id: {
      type: GraphQLString,
    },
  },
});

const MovieExternalIdsQuery = {
  type: MovieExternalIdsType,
  args: {
    id: {
      type: GraphQLInt,
    },
  },
  resolve(parentValue, { id }) {
    return axios
      .get(`${API_URL}/movie/${id}/external_ids?api_key=${API_KEY}`)
      .then(res => res.data)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  MovieExternalIdsQuery,
};
