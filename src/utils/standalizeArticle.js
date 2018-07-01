// utils -> standalizeArticle

const cheerio = require('cheerio');
const sanitize = require('sanitize-html');
const htmlmin = require('html-minifier').minify;
const absolutifyURL = require('./absolutifyURL');

const standalize = (html) => {
  const $ = cheerio.load(html, {
    normalizeWhitespace: true,
    decodeEntities: true,
  });

  $('a').each((i, elem) => {
    let href = $(elem).attr('href');
    if (href) {
      $(elem).attr('href', absolutifyURL(url, href));
      $(elem).attr('target', '_blank');
    }
  });

  $('img').each((i, elem) => {
    const $e = $(elem);
    let src = $e.attr('src') || $e.attr('data-src');
    if (src) {
      $e.attr('src', absolutifyURL(url, src));
    }
  });


  let cleanHtml = htmlmin($.html(), {
    removeComments: true,
    removeEmptyElements: true,
    removeEmptyAttributes: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    removeTagWhitespace: true,
  });

  cleanHtml = sanitize(cleanHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5',
      'u', 'b', 'i', 'em', 'strong',
      'div', 'span', 'p', 'article', 'blockquote',
      'ul', 'ol', 'li',
      'dd', 'dl',
      'table', 'th', 'tr', 'td', 'thead', 'tbody', 'tfood',
      'label',
      'fieldset', 'legend',
      'img', 'picture',
      'br',
      'a',
    ],
    allowedAttributes: {
      a: ['href'],
      img: ['src', 'alt'],
      link: ['href', 'type'],
    },
  });

  return cleanHtml;
};

module.exports = standalize;
