module.exports.array_sum  = function(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};
module.exports.array_count = function(array) {
  return array.length;
};
module.exports.number = 555;
module.exports.multiply = function(x, y) {
  return `${x} умножить ${y} равно ${x * y}`;
};
