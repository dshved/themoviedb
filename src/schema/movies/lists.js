const axios = require("axios");
const { API_KEY, API_URL } = require("../../../config");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const MovieListsType = new GraphQLObjectType({
  name: "MovieLists",
  description: `Get a list of lists that this movie belongs to.`,
  fields: {
    id: {
      type: GraphQLInt,
    },
    description: {
      type: GraphQLString,
    },
    favorite_count: {
      type: GraphQLInt,
    },
    item_count: {
      type: GraphQLInt,
    },
    iso_639_1: {
      type: GraphQLString,
    },
    list_type: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    poster_path: {
      type: GraphQLString,
    },
  },
});

const MovieListsQuery = {
  type: new GraphQLList(MovieListsType),
  args: {
    id: {
      type: GraphQLInt,
    },
    language: {
      type: GraphQLString,
      description: `
        Pass a ISO 639-1 value to display translated data for the fields that support it.
        minLength: 2
        pattern: ([a-z]{2})-([A-Z]{2})
        default: en-US
      `,
    },
    page: {
      type: GraphQLInt,
      description: `
        Specify which page to query.
        minimum: 1
        maximum: 1000
        default: 1`,
    },
  },
  resolve(parentValue, { id, language = "en-US", page = 1 }) {
    return axios
      .get(
        `${API_URL}/movie/${id}/lists?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => {
        return res.data.results;
      });
  },
};

module.exports = {
  MovieListsQuery,
};
