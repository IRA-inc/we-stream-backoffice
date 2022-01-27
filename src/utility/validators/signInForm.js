import validator from 'validator';

export default(data) => {
  let errors = {};

  if (validator.isEmpty(data.username)) {
    errors.usernameError = 'Username cannot be empty';
  }

  if (data.password.length < 8) {
    errors.passwordError = 'Password is too short';
  }

  return {
    errors,
    isValid: !Object
      .keys(errors)
      .length
  }
};
