const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
} = require('graphql');

const GenreType = new GraphQLObjectType({
  name: 'Genres',
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  },
});

const MovieBigType = {
  id: {
    type: GraphQLInt,
  },
  adult: {
    type: GraphQLBoolean,
  },
  backdrop_path: {
    type: GraphQLString,
  },
  budget: {
    type: GraphQLInt,
  },
  genres: {
    type: new GraphQLList(GenreType),
  },
  homepage: {
    type: GraphQLString,
  },
  imdb_id: {
    type: GraphQLString,
  },
  original_language: {
    type: GraphQLString,
  },
  original_title: {
    type: GraphQLString,
  },
  overview: {
    type: GraphQLString,
  },
  popularity: {
    type: GraphQLInt,
  },
  poster_path: {
    type: GraphQLString,
  },
  release_date: {
    type: GraphQLString,
  },
  revenue: {
    type: GraphQLInt,
  },
  runtime: {
    type: GraphQLInt,
  },
  status: {
    type: GraphQLString,
  },
  tagline: {
    type: GraphQLString,
  },
  title: {
    type: GraphQLString,
  },
  video: {
    type: GraphQLBoolean,
  },
  vote_average: {
    type: GraphQLInt,
  },
  vote_count: {
    type: GraphQLInt,
  },
};

const MovieSmallType = {
  id: {
    type: GraphQLString,
  },
  title: {
    type: GraphQLString,
  },
  poster_path: {
    type: GraphQLString,
  },
  adult: {
    type: GraphQLBoolean,
  },
  overview: {
    type: GraphQLString,
  },
  release_date: {
    type: GraphQLString,
  },
  genre_ids: {
    type: new GraphQLList(GraphQLInt),
  },
  original_title: {
    type: GraphQLString,
  },
  original_language: {
    type: GraphQLString,
  },
  backdrop_path: {
    type: GraphQLString,
  },
  popularity: {
    type: GraphQLFloat,
  },
  vote_count: {
    type: GraphQLInt,
  },
  video: {
    type: GraphQLBoolean,
  },
  vote_average: {
    type: GraphQLFloat,
  },
};

const LanguageType = {
  type: GraphQLString,
  description: `
    Pass a ISO 639-1 value to display translated data for the fields that support it.
    minLength: 2
    pattern: ([a-z]{2})-([A-Z]{2})
    default: en-US
  `,
};

const PageType = {
  type: GraphQLInt,
  description: `
    Specify which page to query.
    minimum: 1
    maximum: 1000
    default: 1`,
};

const MovieDefaultArgsType = {
  language: {
    ...LanguageType,
  },
  page: {
    ...PageType,
  },
  region: {
    type: GraphQLString,
    description: `
      Specify a ISO 3166-1 code to filter release dates. Must be uppercase.
      pattern: ^[A-Z]{2}$`,
  },
};

module.exports = {
  MovieSmallType,
  MovieDefaultArgsType,
  MovieBigType,
  LanguageType,
  PageType,
};
