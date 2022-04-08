let _moveArrayIndex = (array, oldIndex, newIndex) => {
    if (newIndex >= array.length) return array;
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
};

export { _moveArrayIndex };