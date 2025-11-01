/**
 * Utility functions for standardized API responses
 */

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {Object} data - Response data
 * @param {Number} statusCode - HTTP status code (default: 200)
 */
const sendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    ...data
  });
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {String} message - Error message
 * @param {Number} statusCode - HTTP status code (default: 500)
 * @param {Object} error - Error object (optional, shown in development)
 */
const sendError = (res, message, statusCode = 500, error = null) => {
  const response = {
    success: false,
    message
  };

  // Include error details only in development
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = error.message || error;
  }

  return res.status(statusCode).json(response);
};

/**
 * Handle validation errors
 * @param {Object} res - Express response object
 * @param {String} message - Validation error message
 */
const sendValidationError = (res, message) => {
  return sendError(res, message, 400);
};

/**
 * Handle not found errors
 * @param {Object} res - Express response object
 * @param {String} resource - Name of the resource not found
 */
const sendNotFound = (res, resource = 'Resource') => {
  return sendError(res, `${resource} not found`, 404);
};

/**
 * Handle unauthorized errors
 * @param {Object} res - Express response object
 * @param {String} message - Unauthorized error message
 */
const sendUnauthorized = (res, message = 'Unauthorized') => {
  return sendError(res, message, 401);
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
  sendUnauthorized
};
