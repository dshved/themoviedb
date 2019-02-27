const axios = require('axios');
const { GraphQLObjectType } = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { MovieBigType, LanguageType } = require('./types');

const MovieLatestType = new GraphQLObjectType({
  name: 'MovieLatest',
  description:
    'Get the most newly created movie. This is a live response and will continuously change.',
  fields: {
    ...MovieBigType,
  },
});

const MovieLatestQuery = {
  type: MovieLatestType,
  args: {
    language: {
      ...LanguageType,
    },
  },
  resolve(parentValue, { language = 'en-US' }) {
    return axios
      .get(`${API_URL}/movie/latest?api_key=${API_KEY}&language=${language}`)
      .then(res => res.data);
  },
};

module.exports = {
  MovieLatestQuery,
};
