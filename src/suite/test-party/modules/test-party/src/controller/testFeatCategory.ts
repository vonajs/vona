import { BeanBase, Controller } from 'vona';
import { TableIdentity } from 'vona-module-a-core';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatCategory extends BeanBase<ScopeModule> {
  async category() {
    // atomClass
    const atomClass = {
      module: 'test-party',
      atomClassName: 'party',
    };

    // add
    const categoryId = await this.app.bean.category.add({
      atomClass,
      data: {
        language: 'en-us',
        categoryName: 'levelOne',
        categoryIdParent: 0,
      },
    });
    assert(TableIdentity.isValid(categoryId));

    // parseCategoryName: levelOne.levelTwo.levelThree
    const category = await this.app.bean.category.parseCategoryName({
      atomClass,
      language: 'en-us',
      categoryName: 'levelOne.levelTwo.levelThree',
      force: true,
    });
    assert.equal(category.categoryName, 'levelThree');

    // ok
    this.app.success();
  }
}
