const functions = require('./resource/functions.js');
const menus = require('./resource/menus.js');
const mines = require('./resource/mines.js');
const deprecated = require('./resource/deprecated.js');

let resources = [];
resources = resources.concat(functions);
resources = resources.concat(menus);
resources = resources.concat(mines);
resources = resources.concat(deprecated);
// ok
export default resources;
