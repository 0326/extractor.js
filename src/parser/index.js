const readability = require('es6-readability');
const standalize = require('../utils/standalizeArticle');
module.exports = (html) => {
  return readability(html).then((a) => {
    return standalize(a.content);
  });
}