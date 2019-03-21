const { PeoplePopularQuery } = require('./popular');
const { PeopleLatestQuery } = require('./latest');

module.exports = {
  PeopleQuery: {
    peoplePopular: {
      ...PeoplePopularQuery,
    },
    peopleLatest: {
      ...PeopleLatestQuery,
    },
  },
};
