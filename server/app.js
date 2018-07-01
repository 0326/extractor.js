const Koa = require('koa');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const extractor = require('../src/extractor');

const app = new Koa();

app.use(async ctx => {
  if (ctx.path === '/extract') {
    const { url } = ctx.request.query;
    const data = await extractor(decodeURIComponent(url));
    ctx.body = {
      data,
    };
    return;
  }

  const htmlData = await fs.readFileSync(path.join(__dirname, './index.ejs'), 'utf8');
  const template = ejs.compile(htmlData);
  ctx.body = template();
});

console.log('server on http://127.0.0.1:3000');
app.listen(3000);