import { BeanBase, Controller } from 'vona';
import { TableIdentity } from 'vona-module-a-database';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatTag extends BeanBase<ScopeModule> {
  async tag() {
    // atomClass
    const atomClass = {
      module: 'test-party',
      atomClassName: 'party',
    };

    // add
    const tagId = await this.app.bean.tag.add({
      atomClass,
      data: {
        // language: 'en-us', // neednot set language
        tagName: 'tagOne',
      },
    });
    assert(TableIdentity.isValid(tagId));

    // parseTags: 'tagOne,tagTwo,tagThree'
    const tagIds = await this.app.bean.tag.parseTags({
      atomClass,
      // language: 'en-us',// neednot set language
      tagName: 'tagOne,tagTwo,tagThree',
      force: true,
    });
    assert.equal(tagIds.length, 3);

    // ok
    this.app.success();
  }
}
