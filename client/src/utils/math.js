/**
 * Converts angle from degrees to radiams
 * @name degreesToRads
 * @param  {Number} degrees
 * @returns {Number} angle in radians
*/
let degreesToRads = (degrees) => {
    return degrees * (Math.PI / 180);
}

/**
 * Generates random integer in range
 * @name randNo
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} random number
*/
let randNo = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

/** linear interpolation function
 * @param {Number} start - interpolating from
 * @param {Number} end - interpolating t0
 * @param {Number} alpha - range 0-1, interpolation progress
 * @returns {Number} interpolated value
 */
function lerp(start, end, alpha) {
  return start + (end - start) * alpha
}

/** easing in/out function for linear interpolation using sin curve
 * @name _easeAlpha
 * @param {Number} alpha - range 0-1, interpolation progress
 * @returns {Number} eased alpha value
 */
function easeAlpha(alpha) {
  return -(Math.cos(Math.PI * alpha) - 1) / 2;
}

export { degreesToRads, randNo, lerp, easeAlpha };