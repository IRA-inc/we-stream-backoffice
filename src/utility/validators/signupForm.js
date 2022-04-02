import validator from 'validator';

export default(data) => {
  let errors = {};

  if (validator.isEmpty(data.username)) {
    errors.usernameError = 'username can\'t be empty';
  }

  if (validator.isEmpty(data.email)) {
    errors.emailError = 'email can\'t be empty';
  }

  if (validator.isEmpty(data.name)) {
    errors.nameError = 'name can\'t be empty';
  }

  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumberError = 'phoneNumber can\'t be empty';
  }

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
