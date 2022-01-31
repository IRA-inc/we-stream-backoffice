import validator from 'validator';

export default(data) => {
  let errors = {};

  if (validator.isEmpty(data.username)) {
    errors.usernameError = 'username can\'t be empty';
  }

  if (data.password.length < 8) {
    errors.passwordError = 'password can\'t be empty';
  }

  return {
    errors,
    isValid: !Object
      .keys(errors)
      .length
  }
};
