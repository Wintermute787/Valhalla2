const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCharacterInput(data) {
  let errors = {};

  data.characterName = !isEmpty(data.characterName) ? data.characterName : "";
  data.level = !isEmpty(data.level) ? data.level : "";
  data.race = !isEmpty(data.race) ? data.race : "";
  data.sex = !isEmpty(data.sex) ? data.sex : "";
  data.job = !isEmpty(data.job) ? data.job : "";

  if (validator.isEmpty(data.characterName)) {
    errors.characterName = "character name is required";
  }
  if (validator.isEmpty(data.level)) {
    errors.level = "level field is required";
  }
  if (validator.isEmpty(data.race)) {
    errors.race = "Race field is required";
  }
  if (validator.isEmpty(data.sex)) {
    errors.sex = "Sex field is required";
  }
  if (validator.isEmpty(data.job)) {
    errors.job = "Job field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
