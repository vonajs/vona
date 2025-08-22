import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceCategory extends BeanBase {
  async categoryTree() {
    // create
    const treeCreate = await this.scope.model.category.insert({
      name: 'Category-1',
      children: [
        {
          name: 'Category-1-1',
          children: [
            { name: 'Category-1-1-1' },
          ],
        },
        {
          name: 'Category-1-2',
        },
      ],
    });
    // get
    const tree = await this.scope.model.category.get({
      id: treeCreate.id,
    });
    assert.equal(tree?.children.length, 2);
    assert.equal(tree?.children[0].children.length, 1);
    // update
    await this.scope.model.category.update({
      id: treeCreate.id,
      name: 'Category-1-Update',
      children: [
        // create
        { name: 'Category-1-3' },
        // update
        { id: treeCreate.children[0].id, name: 'Category-1-1-Update' },
        // delete
        { id: treeCreate.children[1].id, deleted: true },
      ],
    });
    // delete
    await this.scope.model.category.delete({
      id: treeCreate.id,
    });
  }
}
