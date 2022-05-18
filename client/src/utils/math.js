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

export { degreesToRads, randNo };