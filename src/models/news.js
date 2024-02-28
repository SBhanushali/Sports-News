const mysql = require("../lib/mysql");

const createNews = async ({ title, description, tourId, matchId }) => {
  const statement =
    "insert into mydb.news (title, description, tourId, matchId) values (?, ?, ?, ?)";
  try {
    const result = await mysql.query(statement, [
      title,
      description,
      tourId,
      matchId,
    ]);
    return result;
  } catch (err) {
    mysql.handleQueryError(err);
  }
};

const getNewsByMatchId = async (matchId) => {
  const statement = "select title, description from news where matchId = ?";
  try {
    const result = await mysql.query(statement, [matchId]);
    return result;
  } catch (err) {
    mysql.handleQueryError(err);
  }
};

const getNewsByTourId = async (tourId) => {
  const statement = "select title, description from news where tourId = ?";
  try {
    const result = await mysql.query(statement, [tourId]);
    return result;
  } catch (err) {
    mysql.handleQueryError(err);
  }
};

const getNewsBySportsId = async (sportId) => {
  const statement =
    "select n.title, n.description from news n inner join tours t on t.id = n.tourId and t.sportId = ?";
  try {
    const result = await mysql.query(statement, [sportId]);
    return result;
  } catch (err) {
    mysql.handleQueryError(err);
  }
};

module.exports = {
  createNews,
  getNewsByMatchId,
  getNewsByTourId,
  getNewsBySportsId,
};
