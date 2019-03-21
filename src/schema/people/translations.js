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

const DataType = new GraphQLObjectType({
  name: 'PeopleTranslationsData',
  fields: {
    biography: {
      type: GraphQLString,
    },
  },
});

const TranslationsType = new GraphQLObjectType({
  name: 'Translations',
  fields: {
    iso_639_1: {
      type: GraphQLString,
    },
    iso_3166_1: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    data: {
      type: DataType,
    },
    english_name: {
      type: GraphQLString,
    },
  },
});

const PeopleTranslationsType = new GraphQLObjectType({
  name: 'PeopleTranslations',
  description:
    'Get a list of translations that have been created for a person.',
  fields: {
    translations: {
      type: new GraphQLList(TranslationsType),
    },
    id: {
      type: GraphQLInt,
    },
  },
});

const PeopleTranslationsQuery = {
  type: PeopleTranslationsType,
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
        `${API_URL}/person/${id}/translations?api_key=${API_KEY}&language=${language}`,
      )
      .then(res => res.data)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  PeopleTranslationsQuery,
};
