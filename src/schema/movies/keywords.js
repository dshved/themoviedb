const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLError,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const MovieKeywordsType = new GraphQLObjectType({
  name: 'MovieKeywords',
  description: 'Get the keywords that have been added to a movie.',
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  },
});

const MovieKeywordsQuery = {
  type: new GraphQLList(MovieKeywordsType),
  args: {
    id: {
      type: GraphQLInt,
    },
  },
  resolve(parentValue, { id }) {
    return axios
      .get(`${API_URL}/movie/${id}/keywords?api_key=${API_KEY}`)
      .then(res => res.data.keywords)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  MovieKeywordsQuery,
};
