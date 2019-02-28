const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLError,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const DataType = new GraphQLObjectType({
  name: 'MovieTranslationsData',
  fields: {
    title: {
      type: GraphQLString,
    },
    overview: {
      type: GraphQLString,
    },
    homepage: {
      type: GraphQLString,
    },
  },
});

const MovieTranslationsType = new GraphQLObjectType({
  name: 'MovieTranslations',
  description: 'Get a list of translations that have been created for a movie.',
  fields: {
    iso_3166_1: {
      type: GraphQLString,
    },
    iso_639_1: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    english_name: {
      type: GraphQLString,
    },
    data: {
      type: DataType,
    },
  },
});

const MovieTranslationsQuery = {
  type: new GraphQLList(MovieTranslationsType),
  args: {
    id: {
      type: GraphQLInt,
    },
  },
  resolve(parentValue, { id }) {
    return axios
      .get(`${API_URL}/movie/${id}/translations?api_key=${API_KEY}`)
      .then(res => res.data.translations)
      .catch(({ res }) => new GraphQLError(res.data));
  },
};

module.exports = {
  MovieTranslationsQuery,
};
