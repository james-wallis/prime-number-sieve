Object.defineProperty(Array.prototype, 'flat', {
  value: function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
  }
});

const orderArray = array => {
  array.sort((a, b) => a[0] - b[0]);
  return array.flat();
}

module.exports = orderArray;