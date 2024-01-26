const notEmpty = require('./keyword/notEmpty.js');
const date = require('./keyword/date.js');
const atomName = require('./keyword/atomName.js');
const slug = require('./keyword/slug.js');
export default {
  notEmpty,
  'x-date': date,
  'x-atomName': atomName,
  'x-slug': slug,
};
