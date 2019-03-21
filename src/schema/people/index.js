const { PeoplePopularQuery } = require('./popular');
const { PeopleLatestQuery } = require('./latest');
const { PeopleTranslationsQuery } = require('./translations');

module.exports = {
  PeopleQuery: {
    peoplePopular: {
      ...PeoplePopularQuery,
    },
    peopleLatest: {
      ...PeopleLatestQuery,
    },
    peopleTranslations: {
      ...PeopleTranslationsQuery,
    },
  },
};
