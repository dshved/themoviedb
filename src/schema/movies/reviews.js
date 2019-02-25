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

const MovieReviewsType = new GraphQLObjectType({
  name: "MovieReviews",
  description: `Get the user reviews for a movie.`,
  fields: {
    id: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
  },
});

const MovieReviewsQuery = {
  type: new GraphQLList(MovieReviewsType),
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
        `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=${language}&page=${page}`,
      )
      .then(res => {
        return res.data.results;
      });
  },
};

module.exports = {
  MovieReviewsQuery,
};
