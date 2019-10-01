const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGamesInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "A description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
