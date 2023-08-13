const validators = {
  phone: /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
  space: /^\s/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  positiveIntNum: /^[0-9]\d*$/,
  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character */
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export default validators;
