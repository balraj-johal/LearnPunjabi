/** moves a specific element to specified position in the array
 * @name _moveArrayIndex
 * @param {Array} array
 * @param {Number} oldIndex - index of elem to shift
 * @param {Number} newIndex - index that elem should become
 * @returns {Array} updated array
 */
let _moveArrayIndex = (array, oldIndex, newIndex) => {
    if (newIndex >= array.length) return array;
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
};

/** Returns whether a given elem index is the first, last, or middle of array
 * @name getListEndsState
 * @param  {String} index - task index
 * @param  {Array} array
 * @returns {String} "first", "middle" or "last" - is 
 */
let _getListEndsState = (index, array) => {
    if (index === 0) return "first"
    if (index === array.length - 1) return "last"
    return "middle"
}

/**
 * Returns a shuffled array.
 * @param {Array} arr - the array to shuffle.
 * @returns {Array} shuffled array.
 */
let _shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5)
};

export { _moveArrayIndex, _getListEndsState, _shuffle };