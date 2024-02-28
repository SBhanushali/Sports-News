const News = require("../models/news");

const createNews = async (data) => {
  const { title, description, tourId, matchId } = data;
  validateNews(title, description, tourId);
  const result = await News.createNews({ title, description, tourId, matchId });
  return { status: 201, id: result.insertId };
};

function validateNews(title, description, tourId, matchId) {
  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error("Title is required and must be a non-empty string");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    throw new Error("Description is required and must be a non-empty string");
  }

  if (!matchId && !tourId) {
    throw new Error("Either matchId or tourId is required");
  }
}

const getNewsByMatchId = async (matchId) => {
  if (!matchId) {
    throw new Error("Missing required parameters: matchId");
  }
  const result = await News.getNewsByMatchId(matchId);
  return result;
};

const getNewsByTourId = async (tourId) => {
  if (!tourId) {
    throw new Error("Missing requried parameters: tourId");
  }
  const result = await News.getNewsByTourId(tourId);
  return result;
};

const getNewsBySportId = async (sportId) => {
  if (!sportId) {
    throw new Error("Missing required parameters: sportId");
  }
  return await News.getNewsBySportsId(sportId);
};

module.exports = {
  createNews: createNews,
  getNewsByMatchId: getNewsByMatchId,
  getNewsByTourId: getNewsByTourId,
  getNewsBySportId: getNewsBySportId,
};
