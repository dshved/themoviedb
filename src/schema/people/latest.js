const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLError,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { LanguageType } = require('./types');

const PeopleLatestType = new GraphQLObjectType({
  name: 'PeopleLatest',
  description:
    'Get the most newly created person. This is a live response and will continuously change.',
  fields: {
    adult: {
      type: GraphQLBoolean,
    },
    // also_known_as: array[object]
    biography: {
      type: GraphQLString,
    },
    birthday: {
      type: GraphQLString,
    },
    deathday: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLInt,
    },
    homepage: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLInt,
    },
    imdb_id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    place_of_birth: {
      type: GraphQLString,
    },
    popularity: {
      type: GraphQLFloat,
    },
    profile_path: {
      type: GraphQLString,
    },
  },
});

const PeopleLatestQuery = {
  type: PeopleLatestType,
  args: {
    language: {
      ...LanguageType,
    },
  },
  resolve(parentValue, { language = 'en-US' }) {
    return axios
      .get(`${API_URL}/person/latest?api_key=${API_KEY}&language=${language}`)
      .then(res => res.data)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  PeopleLatestQuery,
};
