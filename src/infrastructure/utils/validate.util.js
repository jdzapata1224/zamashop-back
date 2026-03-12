const { Types } = require('mongoose');

const requireString = (value, fieldName) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw new Error(`${fieldName} es requerido`);
  }
};

const requireNumber = (value, fieldName) => {
  if (!value || typeof value !== 'number') {
    throw new Error(`${fieldName} es requerido`);
  }
};

const requireBoolean = (value, fieldName) => {
  if (!value || typeof value !== 'boolean') {
    throw new Error(`${fieldName} es requerido`);
  }
};

const requireDate = (value, fieldName) => {
  if (!value || !(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error(`${fieldName} es requerido y debe ser una fecha válida`);
  }
};



const requireObjectId = (value, fieldName) => {
  if (!value || !Types.ObjectId.isValid(value)) {
    throw new Error(`${fieldName} es requerido y debe ser un Id válido`);
  }
};

const optionalString = (value, fieldName) => {
  if (value !== undefined && value !== null && typeof value !== 'string') {
    throw new Error(`${fieldName} debe ser texto`);
  }
};

module.exports = {
  requireBoolean,
  requireNumber,
  requireString,
  requireObjectId,
  optionalString,
  requireDate
};
