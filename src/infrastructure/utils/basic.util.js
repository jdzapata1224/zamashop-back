const { Types } = require('mongoose');

const jwt                    = require('jsonwebtoken');
const toUpper = (value) => value?.trim().toUpperCase() ?? null;
const toLower = (value) => value?.trim().toLowerCase() ?? null;
const toObjectId = (value) => new Types.ObjectId(value);
const trimmedString=(value) => value?.trim()?? null;
const toDate=(value)=>new Date(value * 1000).toISOString();

const toNumber = (value) => {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
};

const toDecimal = (value, decimals = 2) => {
  if (value === null || value === undefined) return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parseFloat(parsed.toFixed(decimals));
};

const toBoolean = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.trim().toLowerCase();
    if (lower === 'true' || lower === '1' || lower === 'yes') return true;
    if (lower === 'false' || lower === '0' || lower === 'no') return false;
  }
  if (typeof value === 'number') return value !== 0;
  return null;
};

const extractTokenId = (rawInput) => {
  const tokenId = rawInput.infoLogin;
  if (!tokenId.uui) throw new Error('Token inválido: id de usuario no encontrado');
  return tokenId.uui;
};

module.exports = {
  toDecimal,
  toBoolean,
  toDate,
  extractTokenId,
  trimmedString,
  toUpper,
  toLower,
  toObjectId,
  toNumber
};
