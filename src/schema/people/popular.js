const axios = require('axios');
const { GraphQLObjectType, GraphQLList, GraphQLError } = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { PersonPopularType, PeopleDefaultArgsType } = require('./types');

const PeoplePupularType = new GraphQLObjectType({
  name: 'PeoplePopular',
  description:
    'Get the list of popular people on TMDb. This list updates daily.',
  fields: {
    ...PersonPopularType,
  },
});

const PeoplePopularQuery = {
  type: new GraphQLList(PeoplePupularType),
  args: {
    ...PeopleDefaultArgsType,
  },
  resolve(parentValue, { language = 'en-US', page = 1 }) {
    return axios
      .get(
        `${API_URL}/person/popular?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => res.data.results)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  PeoplePopularQuery,
};
