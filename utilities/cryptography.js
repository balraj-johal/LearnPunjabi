const crypto = require('crypto');

/**
 * Generates cryptographically secure random string of specified length
 * @name genVerificationCode
 * @param  {Number} length
 * @returns {String} code
*/
exports.genVerificationCode = (length) => {
    let code = crypto
        .randomBytes(length)
        .toString('base64')
        .slice(0, length)
    return escape(code);
}