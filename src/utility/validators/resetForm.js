import validator from 'validator';

export default(data) => {
  let errors = {};

  if (data.password.length < 8) {
    errors.passwordError = 'password must be 8 character';
  }

  if (data.password !== data.confirmPassword) {
    errors.passwordConfirmError = 'password isn\'t matching';
  }

  return {
    errors,
    isValid: !Object
      .keys(errors)
      .length
  }
};
