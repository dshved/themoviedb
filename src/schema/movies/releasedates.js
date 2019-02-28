const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLError,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const ReleaseDatesType = new GraphQLObjectType({
  name: 'ReleaseDates',
  fields: {
    certification: {
      type: GraphQLString,
    },
    iso_639_1: {
      type: GraphQLString,
    },
    release_date: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLInt,
    },
    note: {
      type: GraphQLString,
    },
  },
});

const MovieReleaseDatesType = new GraphQLObjectType({
  name: 'MovieReleaseDates',
  description: `
    Get the release date along with the certification for a movie.
    Release dates support different types:
  
    1. Premiere
    2. Theatrical (limited)
    3. Theatrical
    4. Digital
    5. Physical
    6. TV`,
  fields: {
    iso_3166_1: {
      type: GraphQLString,
    },
    release_dates: {
      type: new GraphQLList(ReleaseDatesType),
    },
  },
});

const MovieReleaseDatesQuery = {
  type: new GraphQLList(MovieReleaseDatesType),
  args: {
    id: {
      type: GraphQLInt,
    },
  },
  resolve(parentValue, { id }) {
    return axios
      .get(`${API_URL}/movie/${id}/release_dates?api_key=${API_KEY}`)
      .then(res => res.data.results)
      .catch(({ res }) => new GraphQLError(res.data));
  },
};

module.exports = {
  MovieReleaseDatesQuery,
};
