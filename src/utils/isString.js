
// utils -> isString

module.exports = function(val) {
  return {}.toString.call(val) === '[object String]';
}
