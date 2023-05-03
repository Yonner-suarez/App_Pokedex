export const validate = (user, errors, setErrors) => {
  const error = { ...errors };

  if (!user.userName) {
    error.userName = "Input your User Name";
  } else if (user.userName.length > 15) {
    error.userName = "User too long";
  } else if (!/^[a-zA-Z0-9]+$/.test(user.userName)) {
    error.userName = "Must contain letters and numbers";
  } else {
    error.userName = "";
  }

  if (!user.password) {
    error.password = "Input your Password";
  } else if (!/(?=.*[a-zA-Z])/.test(user.password)) {
    error.password = "Must contain a capital letter or lowercase";
  } else if (!/(?=.*[!#$%&?* "])/.test(user.password)) {
    error.password = "Must contain a special character";
  } else if (!/(?=.*\d)/.test(user.password)) {
    error.password = "Must contain a number";
  } else if (!/^.*(?=.{6,})/.test(user.password)) {
    error.password = "Must have 6 digits";
  } else {
    error.password = "";
  }

  if (!user.confirmPassword) {
    error.confirmPassword = "Verify your password";
  } else if (user.password !== user.confirmPassword) {
    error.confirmPassword = "Password does not apply";
  } else {
    error.confirmPassword = "";
  }

  setErrors(error);
};
