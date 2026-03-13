const { Types } = require('mongoose');

const requireString = (value, fieldName) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw new Error(`${fieldName} es requerido`);
  }
};

const requireNumber = (value, fieldName) => {
  if (value === null || value === undefined || typeof value !== 'number') {
    throw new Error(`${fieldName} es requerido`);
  }
};

const requireEnum = (value, fieldName, validValues) => {
  if (!value || !validValues.includes(value)) {
    throw new Error(`${fieldName} es requerido y debe ser uno de: ${validValues.join(', ')}`);
  }
};
const requireBoolean = (value, fieldName) => {
  if (value === null || value === undefined || typeof value !== 'boolean') {
    throw new Error(`${fieldName} es requerido`);
  }
};

const requireDecimal = (value, fieldName) => {
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    throw new Error(`${fieldName} es requerido y debe ser un número decimal válido`);
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
  requireEnum,
  requireBoolean,
  requireNumber,
  requireString,
  requireObjectId,
  optionalString,
  requireDate,
  requireDecimal
};
