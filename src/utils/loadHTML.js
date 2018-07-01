// utils -> loadHTML

const {
  error,
  info,
} = require('./logger');

const fetch = require('node-fetch');
const cache = require('./cache');

const loadHTML = (url) => {
  return new Promise((resolve, reject) => {
    let stored = cache.get(url);
    if (stored) {
      info(`Got HTML from cache: ${url}`);
      return resolve(stored);
    }

    fetch(url, {
      headers: {},
      timeout: 3000,
      agent: false,
    })
      .then(async (res) => {
        let {
          ok,
          status,
          headers,
        } = res;
        if (!ok || status !== 200) {
          throw new Error(`Fetching failed for "${url}"`);
        }
        let contentType = headers.get('content-type') || '';
        if (!contentType || !contentType.startsWith('text/')) {
          throw new Error(`Error with contentType "${contentType}"`);
        }
        info(`Loaded remote HTML content: ${url}`);
        return await res.text();
      })
      .then((data) => {
        info(`Finish fetching HTML content for ${url}`);
        cache.set(url, data);
        return resolve(data);
      }).catch((err) => {
        error(err);
        return reject(err);
      });
  });
};

module.exports = loadHTML;
