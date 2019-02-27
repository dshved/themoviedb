const { MovieUpcomingQuery } = require('./upcoming');
const { MovieTopRatedQuery } = require('./toprated');
const { MoviePopularQuery } = require('./popular');
const { MovieNowPlayingQuery } = require('./nowplaying');
const { MovieLatestQuery } = require('./latest');
const { MovieListsQuery } = require('./lists');
const { MovieReviewsQuery } = require('./reviews');
const { MovieSimilarQuery } = require('./similar');
const { MovieQuery } = require('./movie');
const { MovieRecommendationsQuery } = require('./recommendations');
const { MovieTranslationsQuery } = require('./translations');
const { MovieVideosQuery } = require('./videos');
const { MovieReleaseDatesQuery } = require('./releasedates');

module.exports = {
  MoviesQuery: {
    movieUpcoming: {
      ...MovieUpcomingQuery,
    },
    movieTopRated: {
      ...MovieTopRatedQuery,
    },
    moviePopular: {
      ...MoviePopularQuery,
    },
    movieNowPlaying: {
      ...MovieNowPlayingQuery,
    },
    movieLatest: {
      ...MovieLatestQuery,
    },
    movieLists: {
      ...MovieListsQuery,
    },
    movieReviews: {
      ...MovieReviewsQuery,
    },
    movieSimilar: {
      ...MovieSimilarQuery,
    },
    movieDetail: {
      ...MovieQuery,
    },
    movieRecommendations: {
      ...MovieRecommendationsQuery,
    },
    movieTranslations: {
      ...MovieTranslationsQuery,
    },
    movieVideos: {
      ...MovieVideosQuery,
    },
    movieReleaseDates: {
      ...MovieReleaseDatesQuery,
    },
  },
};
