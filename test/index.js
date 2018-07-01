const extractor = require('../src/extractor');

// let url = 'https://zhuanlan.zhihu.com/p/35193339';
let url = 'https://juejin.im/post/5b35921af265da598f1563cf';

extractor(url).then(res => {
  return res;
}).catch(err => {
  console.error(err);
})