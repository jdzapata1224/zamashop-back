const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};

module.exports = { hashPassword, comparePassword };