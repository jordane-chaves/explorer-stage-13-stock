const AppError = require("../utils/AppError");

/**
 * @param {string[]} rolesToVerify
 */
function verifyUserAuthorization(rolesToVerify) {
  return (request, response, next) => {
    const { user } = request

    const isAuthorized = rolesToVerify.includes(user.role)

    if (!isAuthorized) {
      throw new AppError('Forbidden', 403);
    }

    return next();
  }
}

module.exports = verifyUserAuthorization;