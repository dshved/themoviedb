const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLError,
  GraphQLList,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const MovieCastType = new GraphQLObjectType({
  name: 'MovieCast',
  fields: {
    cast_id: {
      type: GraphQLInt,
    },
    character: {
      type: GraphQLString,
    },
    credit_id: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    order: {
      type: GraphQLInt,
    },
    profile_path: {
      type: GraphQLString,
    },
  },
});
const MovieCrewType = new GraphQLObjectType({
  name: 'MovieCrew',
  fields: {
    credit_id: {
      type: GraphQLString,
    },
    department: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLInt,
    },
    job: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    profile_path: {
      type: GraphQLString,
    },
  },
});
const MovieCreditsType = new GraphQLObjectType({
  name: 'MovieCredits',
  description: 'Get the cast and crew for a movie.',
  fields: {
    id: {
      type: GraphQLInt,
    },
    cast: {
      type: new GraphQLList(MovieCastType),
    },
    crew: {
      type: new GraphQLList(MovieCrewType),
    },
  },
});

const MovieCreditsQuery = {
  type: MovieCreditsType,
  args: {
    id: {
      type: GraphQLInt,
    },
  },
  resolve(parentValue, { id }) {
    return axios
      .get(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then(res => res.data)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  MovieCreditsQuery,
};
