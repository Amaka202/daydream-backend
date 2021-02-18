const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

module.exports = isValidEmail;
