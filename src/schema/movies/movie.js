const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLError,
} = require('graphql');
const { API_KEY, API_URL } = require('../../../config');

const { MovieBigType, LanguageType } = require('./types');

const MovieSimilarType = new GraphQLObjectType({
  name: 'MovieSimilarDetail',
  description:
    'Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website.',
  fields: {
    id: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
  },
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'Get the primary information about a movie.',
  fields: {
    ...MovieBigType,
    similar: {
      type: new GraphQLList(MovieSimilarType),
      resolve(parrentValue) {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/${
              parrentValue.id
            }/similar?api_key=${API_KEY}&language=en-US&page=1`,
          )
          .then(res => res.data.results)
          .catch(({ response }) => new GraphQLError(response.data));
      },
    },
  },
});

const MovieQuery = {
  type: MovieType,
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
      .get(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`)
      .then(res => res.data)
      .catch(({ response }) => new GraphQLError(response.data));
  },
};

module.exports = {
  MovieQuery,
};
