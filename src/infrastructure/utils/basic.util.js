const { Types } = require('mongoose');

const toUpper = (value) => value?.trim().toUpperCase() ?? null;

const toLower = (value) => value?.trim().toLowerCase() ?? null;

const toObjectId = (value) => new Types.ObjectId(value);

const trimmedString=(value) => value?.trim()?? null;

const toDate=(value)=>new Date(value * 1000).toISOString();

const extractTokenId = (rawInput) => {
  const tokenId = rawInput.infoLogin?.id;
  if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');
  return tokenId;
};

module.exports = {
  toDate,
  extractTokenId,
  trimmedString,
  toUpper,
  toLower,
  toObjectId,
};
