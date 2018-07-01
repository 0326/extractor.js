const {
  cache,
  logger,
  isString,
  loadHTML,
  isValidURL,
} = require('./utils');
const parser = require('./parser');

module.exports = async (params = {}) => {
  const inputURL = isString(params) ? params : params.url;
  if (!isValidURL(inputURL)) {
    throw new Error(`Invalid URL: ${inputURL}`);
  }
  
  let stored = cache.get(inputURL);
  if (stored) {
    return stored;
  }

  try {
    const html = await loadHTML(inputURL);
    let article = await parser(html);
    cache.set(inputURL, article);
    return article;
  } catch (e) {
    logger.error(e);
    return e;
  }
}