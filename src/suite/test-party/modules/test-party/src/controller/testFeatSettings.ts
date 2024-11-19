import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestFeatSettings extends BeanBase<ScopeModule> {
  async settings() {
    // user

    // get settings from config
    let data = await this.ctx.bean.settings.getUser({ name: '/groupInfo/username' });
    assert.equal(data, 'zhennann');
    data = await this.ctx.bean.settings.getUser({ name: '/groupExtra/panelExtra/groupInfo/language' });
    assert.equal(data, 'en-us');

    // load settings
    data = await this.ctx.bean.settings.loadSettingsUser();
    assert.equal(data.groupInfo.username, 'zhennann');
    // save settings
    data.groupExtra.panelExtra.groupInfo.language = 'zh-cn';
    await this.ctx.bean.settings.saveSettingsUser({ data });

    // get settings from db
    data = await this.ctx.bean.settings.getUser({ name: '/groupExtra/panelExtra/groupInfo/language' });
    assert.equal(data, 'zh-cn');

    // instance

    // get settings from config
    data = await this.ctx.bean.settings.getInstance({ name: '/groupInfo/slogan' });
    assert.equal(data, '');

    // load settings
    data = await this.ctx.bean.settings.loadSettingsInstance();
    assert.equal(data.groupInfo.slogan, '');
    // save settings
    data.groupInfo.slogan = 'Less is more, while more is less';
    await this.ctx.bean.settings.saveSettingsInstance({ data });

    // get settings from db
    data = await this.ctx.bean.settings.getInstance({ name: '/groupInfo/slogan' });
    assert.equal(data, 'Less is more, while more is less');

    // ok
    this.app.success();
  }
}
