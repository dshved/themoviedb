const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLError,
  GraphQLList,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const MovieAlternativeTitlesType = new GraphQLObjectType({
  name: 'MovieAlternativeTitles',
  description: 'Get all of the alternative titles for a movie.',
  fields: {
    iso_3166_1: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
  },
});

const MovieAlternativeTitlesQuery = {
  type: new GraphQLList(MovieAlternativeTitlesType),
  args: {
    id: {
      type: GraphQLInt,
    },
    country: {
      type: GraphQLString,
    },
  },
  resolve(parentValue, { id, country = '' }) {
    return axios
      .get(
        `${API_URL}/movie/${id}/alternative_titles?api_key=${API_KEY}&country=${country}`,
      )
      .then(res => res.data.titles)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  MovieAlternativeTitlesQuery,
};
