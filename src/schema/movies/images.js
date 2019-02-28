const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = require('graphql');
const { LanguageType } = require('./types');
const { API_KEY, API_URL } = require('../../../config');

const MovieDetailImageType = new GraphQLObjectType({
  name: 'MovieDetailImage',
  fields: {
    aspect_ratio: {
      type: GraphQLFloat,
    },
    file_path: {
      type: GraphQLString,
    },
    height: {
      type: GraphQLInt,
    },
    iso_639_1: {
      type: GraphQLString,
    },
    vote_average: {
      type: GraphQLFloat,
    },
    vote_count: {
      type: GraphQLInt,
    },
    width: {
      type: GraphQLInt,
    },
  },
});

const MovieImagesType = new GraphQLObjectType({
  name: 'MovieImages',
  description: `Get the images that belong to a movie.
  
    Querying images with a language parameter will filter the results. If you want to include a fallback language (especially useful for backdrops) you can use the include_image_language parameter. This should be a comma seperated value like so: include_image_language=en,null.`,
  fields: {
    id: {
      type: GraphQLInt,
    },
    backdrops: {
      type: new GraphQLList(MovieDetailImageType),
    },
    posters: {
      type: new GraphQLList(MovieDetailImageType),
    },
  },
});

const MovieImagesQuery = {
  type: MovieImagesType,
  args: {
    id: {
      type: GraphQLInt,
    },
    language: {
      ...LanguageType,
    },
    imageLanguage: {
      type: GraphQLString,
    },
  },
  resolve(parentValue, { id, language = 'en-US', imageLanguage = 'en,null' }) {
    return axios
      .get(
        `${API_URL}/movie/${id}/images?api_key=${API_KEY}&language=${language}&include_image_language=${imageLanguage}`,
      )
      .then(res => res.data);
  },
};

module.exports = {
  MovieImagesQuery,
};
