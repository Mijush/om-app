const MovieAPIRouter = require("express").Router();
const MovieAPIController = require("./movieAPI.controller");

MovieAPIRouter.get(
  "/salary_planning/:yearId/salary_people/:personId",
  MovieAPIController.getSalaryByPersonId
);

MovieAPIRouter.post(
  "/salary_planning/:yearId/salary_people",
  MovieAPIController.postSalariesByYear
);

MovieAPIRouter.put(
  "/salary_planning/:yearId/salary_people/:personId",
  MovieAPIController.editSalariesById
);

MovieAPIRouter.delete(
  "/salary_planning/:yearId/salary_people/:personId",
  MovieAPIController.deleteSalariesById
);

module.exports = MovieAPIRouter;
