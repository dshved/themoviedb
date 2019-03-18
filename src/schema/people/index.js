const { PeoplePopularQuery } = require('./popular');

module.exports = {
  PeopleQuery: {
    peoplePopular: {
      ...PeoplePopularQuery,
    },
  },
};
