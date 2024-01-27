import functions from './resource/functions.js';
import menus from './resource/menus.js';
import mines from './resource/mines.js';
import deprecated from './resource/deprecated.js';

let resources: any[] = [];
resources = resources.concat(functions);
resources = resources.concat(menus);
resources = resources.concat(mines);
resources = resources.concat(deprecated);
// ok
export default resources;
