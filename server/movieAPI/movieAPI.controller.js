const MovieAPIService = require("./movieAPI.service");

class MovieAPIController {
  static async getSalaryByPersonId(req, res, next) {
    try {
      const salaryPerson = await MovieAPIService.getSalaryByPersonId(
        req.params
      );
      res.status(200).json(salaryPerson);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async postSalariesByYear(req, res, next) {
    try {
      const updatedDb = await MovieAPIService.postSalariesByYear(
        req.params,
        req.body
      );

      res.status(200).json(updatedDb);
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async editSalariesById(req, res, next) {
    try {
      const updatedDb = await MovieAPIService.editSalariesById(
        req.params,
        req.body
      );

      res.status(200).json(updatedDb);
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteSalariesById(req, res, next) {
    try {
      const updatedDb = await MovieAPIService.deleteSalariesById(req.params);

      res.status(200).json(updatedDb);
      res.end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieAPIController;
