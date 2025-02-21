import functions from './resource/functions.ts';
import menus from './resource/menus.ts';
import mines from './resource/mines.ts';
import widgets from './resource/widgets.ts';
import blocks from './resource/blocks.ts';
import deprecateds from './resource/deprecateds.ts';

let resources: any[] = [];
resources = resources.concat(functions);
resources = resources.concat(menus);
resources = resources.concat(mines);
resources = resources.concat(widgets);
resources = resources.concat(blocks);
resources = resources.concat(deprecateds);
export default resources;
