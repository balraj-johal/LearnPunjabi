/**
 * Gets date object for a week from now
 * @name getWeekFromNow
 * @returns {Date} 
*/
exports.getWeekFromNow = () => {
    const now = Date.now();
    return new Date(now + 1000 * 60 * 60 * 24 * 7);
}