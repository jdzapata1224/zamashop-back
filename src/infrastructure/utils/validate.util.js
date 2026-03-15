const { Types } = require('mongoose');

// ─── REQUERIDOS ────────────────────────────────────────────────────────────────

const requireString = (value, fieldName) => {
  if (value === null || value === undefined || typeof value !== 'string' || !value.trim()) {
    throw new Error(`${fieldName} es requerido y debe ser un texto válido`);
  }
};

const requireNumber = (value, fieldName) => {
  if (value === null || value === undefined || typeof value !== 'number' || isNaN(value)) {
    throw new Error(`${fieldName} es requerido y debe ser un número`);
  }
};

const requireDecimal = (value, fieldName) => {
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    throw new Error(`${fieldName} es requerido y debe ser un decimal`);
  }
};

const requireBoolean = (value, fieldName) => {
  if (value === null || value === undefined || typeof value !== 'boolean') {
    throw new Error(`${fieldName} es requerido y debe ser un booleano`);
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

const requireEnum = (value, fieldName, validValues) => {
  if (value === null || value === undefined || !validValues.includes(value)) {
    throw new Error(`${fieldName} es requerido y debe ser uno de: ${validValues.join(', ')}`);
  }
};

// ─── OPCIONALES ────────────────────────────────────────────────────────────────
// Si el valor no viene (null/undefined) no hace nada.
// Si viene, valida que sea del tipo correcto.

const optionalString = (value, fieldName) => {
  if (value === null || value === undefined) return;
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${fieldName} debe ser un texto válido`);
  }
};

const optionalNumber = (value, fieldName) => {
  if (value === null || value === undefined) return;
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(`${fieldName} debe ser un número`);
  }
};

const optionalDecimal = (value, fieldName) => {
  if (value === null || value === undefined) return;
  if (isNaN(parseFloat(value))) {
    throw new Error(`${fieldName} debe ser un decimal`);
  }
};

const optionalBoolean = (value, fieldName) => {
  if (value === null || value === undefined) return;
  if (typeof value !== 'boolean') {
    throw new Error(`${fieldName} debe ser un booleano`);
  }
};

const optionalDate = (value, fieldName) => {
  if (value === null || value === undefined) return;
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new Error(`${fieldName} debe ser una fecha válida`);
  }
};

const optionalObjectId = (value, fieldName) => {
  if (value === null || value === undefined) return;
  if (!Types.ObjectId.isValid(value)) {
    throw new Error(`${fieldName} debe ser un Id válido`);
  }
};

const optionalEnum = (value, fieldName, validValues) => {
  if (value === null || value === undefined) return;
  if (!validValues.includes(value)) {
    throw new Error(`${fieldName} debe ser uno de: ${validValues.join(', ')}`);
  }
};

// ──────────────────────────────────────────────────────────────────────────────

module.exports = {
  requireString,
  requireNumber,
  requireDecimal,
  requireBoolean,
  requireDate,
  requireObjectId,
  requireEnum,
  optionalString,
  optionalNumber,
  optionalDecimal,
  optionalBoolean,
  optionalDate,
  optionalObjectId,
  optionalEnum,
};