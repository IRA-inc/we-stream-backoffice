import validator from 'validator';

export default(data) => {
  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.emailError = 'email can\'t be empty';
  }

  return {
    errors,
    isValid: !Object
      .keys(errors)
      .length
  }
};
