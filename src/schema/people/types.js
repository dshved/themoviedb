const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
} = require('graphql');

const PersonKnownForType = new GraphQLObjectType({
  name: 'PersonKnownForType',
  fields: {
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
    original_title: {
      type: GraphQLString,
    },
    genre_ids: {
      type: new GraphQLList(GraphQLInt),
    },
    id: {
      type: GraphQLInt,
    },
    media_type: {
      type: GraphQLString,
    },
    original_language: {
      type: GraphQLString,
    },
    title: {
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
  },
});

const PersonPopularType = {
  id: {
    type: GraphQLInt,
  },
  profile_path: {
    type: GraphQLString,
  },
  adult: {
    type: GraphQLBoolean,
  },
  name: {
    type: GraphQLString,
  },
  popularity: {
    type: GraphQLFloat,
  },
  known_for: {
    type: new GraphQLList(PersonKnownForType),
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

const PeopleDefaultArgsType = {
  language: {
    ...LanguageType,
  },
  page: {
    ...PageType,
  },
  // region: {
  //   type: GraphQLString,
  //   description: `
  //     Specify a ISO 3166-1 code to filter release dates. Must be uppercase.
  //     pattern: ^[A-Z]{2}$`,
  // },
};

module.exports = {
  PersonPopularType,
  PeopleDefaultArgsType,
  LanguageType,
  PageType,
};
