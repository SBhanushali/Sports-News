const Sport = require("../models/sport");

const getAllSportsToursAndMatches = async () => {
  const sportsToursAndMatches = await Sport.getAllSportsToursAndMatches();
  const res = {};
  sportsToursAndMatches.forEach((sportsToursAndMatch) => {
    const {
      sportName,
      tourName,
      matchName,
      matchId,
      matchStartTime,
      matchFormat,
    } = sportsToursAndMatch;
    if (!res[sportName]) {
      res[sportName] = {};
    }
    if (!res[sportName][tourName]) {
      res[sportName][tourName] = [];
    }
    var match = {
      id: matchId,
      name: matchName,
      startTime: matchStartTime,
      format: matchFormat,
    };
    res[sportName][tourName].push(match);
  });
  return res;
};

module.exports = {
  getAllSportsToursAndMatches: getAllSportsToursAndMatches,
};
