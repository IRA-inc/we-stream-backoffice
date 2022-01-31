import validator from 'validator';

export default(data) => {
  let errors = {};

  if (validator.isEmpty(data.oldPassword)) {
    errors.oldPasswordError = 'current password can\'t be empty';
  }

  if (validator.isEmpty(data.password)) {
    errors.passwordError = 'password can\'t be empty';
  }

  if (data.password.length < 8) {
    errors.passwordError = 'password must be 8 character';
  }


  return {
    errors,
    isValid: !Object
      .keys(errors)
      .length
  }
};
