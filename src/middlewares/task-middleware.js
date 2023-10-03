const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateGetRequest(req, res, next) {
  if (req.query && req.query.year && req.query.month) {
    const { year, month } = req.query;
    if (isNaN(+year)) {
      ErrorResponse.message = 'Something went wrong while getting tasks';
      ErrorResponse.error = new AppError(['Invalid year'], StatusCodes.BAD_REQUEST);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if (isNaN(+month) || +month < 1 || +month > 12) {
      ErrorResponse.message = 'Something went wrong while getting tasks';
      ErrorResponse.error = new AppError(['Invalid month'], StatusCodes.BAD_REQUEST);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
  } else if (req.query && req.query.year) {
    const { year } = req.query;
    if (isNaN(+year)) {
      ErrorResponse.message = 'Something went wrong while getting tasks';
      ErrorResponse.error = new AppError(['Invalid year'], StatusCodes.BAD_REQUEST);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
  } else if (req.query && req.query.month) {
    ErrorResponse.message = 'Something went wrong while getting tasks';
    ErrorResponse.error = new AppError(['No year found in the incoming request. Please include it as part of the query string.'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }

  next();
}

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
  validateGetRequest,
  validateCreateRequest,
  validatePatchRequest
}