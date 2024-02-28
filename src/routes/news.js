const News = require("../controllers/news");

module.exports = function (app) {
  /**
   * Endpoint to create a new news item.
   *
   * POST /api/news
   * Creates a new news item with the provided title, description, and optional tourId or matchId.
   *
   * @param {string} req.body.title - The title of the news item.
   * @param {string} req.body.description - The description of the news item.
   * @param {string} [req.body.tourId] - The ID of the tour associated with the news item (optional).
   * @param {string} [req.body.matchId] - The ID of the match associated with the news item (optional).
   * @returns {object} Created news item object.
   */
  app.route("/news").post(async (req, res, next) => {
    try {
      const data = req.body;
      return res.json(await News.createNews(data));
    } catch (err) {
      return next(err);
    }
  });

  /**
   * Endpoint to retrieve news items by match ID.
   *
   * GET /api/news/match/:matchId
   * Retrieves news items associated with the specified match ID.
   *
   * @param {number} req.params.matchId - The ID of the match for which to retrieve news items.
   * @returns {object[]} An array of news items associated with the specified match ID.
   */
  app.route("/news/match/:matchId").get(async (req, res, next) => {
    try {
      const matchId = parseInt(req.params.matchId);
      return res.json(await News.getNewsByMatchId(matchId));
    } catch (err) {
      return next(err);
    }
  });

  /**
   * Endpoint to retrieve news items by tour ID.
   *
   * GET /api/news/tour/:tourId
   * Retrieves news items associated with the specified tour ID.
   *
   * @param {number} req.params.tourId - The ID of the tour for which to retrieve news items.
   * @returns {object[]} An array of news items associated with the specified tour ID.
   */
  app.route("/news/tour/:tourId").get(async (req, res, next) => {
    try {
      const tourId = parseInt(req.params.tourId);
      return res.json(await News.getNewsByTourId(tourId));
    } catch (err) {
      return next(err);
    }
  });

  /**
   * Endpoint to retrieve news items by sport ID.
   *
   * GET /api/news/sport/:sportId
   * Retrieves news items associated with the specified sport ID.
   *
   * @param {number} req.params.sportId - The ID of the sport for which to retrieve news items.
   * @returns {object[]} An array of news items associated with the specified sport ID.
   */
  app.route("/news/sport/:sportId").get(async (req, res, next) => {
    try {
      const sportId = parseInt(req.params.sportId);
      return res.json(await News.getNewsBySportId(sportId));
    } catch (err) {
      return next(err);
    }
  });
};
