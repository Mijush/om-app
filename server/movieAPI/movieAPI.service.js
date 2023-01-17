const { Console } = require("console");
const fs = require("fs");
const db = JSON.parse(fs.readFileSync("./api.json", "utf-8"));

class MovieAPIService {
  static async getSalaryByPersonId(params) {
    const { yearId, personId } = params;

    let salary = await db.salary_planning.find((y) => {
      return y.id === Number(yearId) && y.salary_people;
    });

    let salaryPerson = await salary.salary_people.filter((s) => {
      return s.id === Number(personId);
    });

    if (salaryPerson === []) {
      throw new Error("No people for this year!");
    }

    const response = salaryPerson[0];
    return response;
  }

  static async postSalariesByYear(params, body) {
    const { yearId } = params;
    let person = body;

    let peopleByYear = await db.salary_planning.find((y) => {
      console.log(y);
      return y.id === Number(yearId) && y.salary_people;
    });

    let lastIndex = peopleByYear.salary_people.length - 1;
    let newId = peopleByYear.salary_people[lastIndex].id + 1;
    person.id = newId;
    person.correction = person.correction;
    person.months = person.months;

    db.salary_planning.forEach((element) => {
      if (element.id === Number(yearId)) {
        element.salary_people.push(person);
      }
    });

    let json = JSON.stringify(db);
    fs.writeFileSync("./db.json", json);
    return db;
  }

  static async editSalariesById(params, body) {
    const { yearId } = params;
    let editedPerson = body;

    db.salary_planning.forEach((element) => {
      if (element.id === Number(yearId)) {
        element.salary_people.forEach((person) => {
          if (person.id === editedPerson.id) {
            person.id = JSON.parse(editedPerson.id);
            person.first_name = editedPerson.first_name;
            person.last_name = editedPerson.last_name;
            person.correction = editedPerson.correction;
            person.months = editedPerson.months;
            person.oe = editedPerson.oe;
          }
        });
      }
    });

    let json = JSON.stringify(db);
    fs.writeFileSync("./db.json", json);
    return db;
  }

  static async deleteSalariesById(params) {
    const { yearId, personId } = params;

    db.salary_planning.forEach((element) => {
      if (element.id === Number(yearId)) {
        let arr = element.salary_people;
        let filteredArr = arr.filter((p) => p.id !== Number(personId));
        element.salary_people = filteredArr;
      }
    });

    let json = JSON.stringify(db);
    fs.writeFileSync("./db.json", json);
    return db;
  }
}

module.exports = MovieAPIService;
