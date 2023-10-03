const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
  if (!req.body.description) {
    ErrorResponse.message = 'Something went wrong while creating task';
    ErrorResponse.error = new AppError(['Description not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  next();
}

function validatePatchRequest(req, res, next) {
  if (!req.body.id) {
    ErrorResponse.message = 'Something went wrong while updating task';
    ErrorResponse.error = new AppError(['id not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validatePatchRequest
}