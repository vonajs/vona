import { BeanBase, Controller, TableIdentity } from 'vona';
import { ScopeModule } from '../../../resource/this.js';
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
    const categoryId = await this.ctx.bean.category.add({
      atomClass,
      data: {
        language: 'en-us',
        categoryName: 'levelOne',
        categoryIdParent: 0,
      },
    });
    assert(TableIdentity.isValid(categoryId));

    // parseCategoryName: levelOne.levelTwo.levelThree
    const category = await this.ctx.bean.category.parseCategoryName({
      atomClass,
      language: 'en-us',
      categoryName: 'levelOne.levelTwo.levelThree',
      force: true,
    });
    assert.equal(category.categoryName, 'levelThree');

    // ok
    this.ctx.success();
  }
}
