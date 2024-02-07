export const forbiddenPasswordRegExp =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g;

export const forbiddenLoginValue = /^[a-zA-Z]+$/;

export const signInValidationTypes = {
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' },
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    {
      type: 'minlength',
      message: 'Password must be at least 6 characters long',
    },
    {
      type: 'forbiddenValue',
      message: `Password should have at least 1 uppercase letter, 1 lowercase letter,
    1 number and at least one of symbols !@#$%^&*`,
    },
  ],
};

export const registrationValidationTypes = {
  userName: [
    {
      type: 'forbiddenValue',
      message: 'invalid login',
    },
    {
      type: 'minlength',
      message: 'Name should have minimum 4 characters',
    },
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' },
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    {
      type: 'minlength',
      message: 'Password must be at least 6 characters long',
    },
    {
      type: 'forbiddenValue',
      message: `Password should have at least 1 uppercase letter, 1 lowercase letter,
    1 number and at least one of symbols !@#$%^&*`,
    },
  ],
  confirmPassword: [
    {
      type: 'confirmPasswordValidator',
      message: `Password and Confirm Password didn't match.`,
    },
  ],
};
