const axios = require('axios');
const { GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql');

const { API_KEY, API_URL } = require('../../../config');

const ReviewType = new GraphQLObjectType({
  name: 'Review',
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
    iso_639_1: {
      type: GraphQLString,
    },
    media_id: {
      type: GraphQLInt,
    },
    media_title: {
      type: GraphQLString,
    },
    media_type: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
  },
});

const ReviewQuery = {
  type: ReviewType,
  args: {
    id: {
      type: GraphQLString,
    },
  },
  resolve(parentValue, { id }) {
    return axios
      .get(`${API_URL}/review/${id}?api_key=${API_KEY}`)
      .then(res => res.data);
  },
};

module.exports = {
  ReviewsQuery: {
    review: ReviewQuery,
  },
};
