mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

@Controller()
export class ControllerTestFeatSettings extends BeanBase {
  async settings() {
    // user

    // get settings from config
    let data = await this.app.bean.settings.getUser({ name: '/groupInfo/username' });
    assert.equal(data, 'zhennann');
    data = await this.app.bean.settings.getUser({ name: '/groupExtra/panelExtra/groupInfo/language' });
    assert.equal(data, 'en-us');

    // load settings
    data = await this.app.bean.settings.loadSettingsUser();
    assert.equal(data.groupInfo.username, 'zhennann');
    // save settings
    data.groupExtra.panelExtra.groupInfo.language = 'zh-cn';
    await this.app.bean.settings.saveSettingsUser({ data });

    // get settings from db
    data = await this.app.bean.settings.getUser({ name: '/groupExtra/panelExtra/groupInfo/language' });
    assert.equal(data, 'zh-cn');

    // instance

    // get settings from config
    data = await this.app.bean.settings.getInstance({ name: '/groupInfo/slogan' });
    assert.equal(data, '');

    // load settings
    data = await this.app.bean.settings.loadSettingsInstance();
    assert.equal(data.groupInfo.slogan, '');
    // save settings
    data.groupInfo.slogan = 'Less is more, while more is less';
    await this.app.bean.settings.saveSettingsInstance({ data });

    // get settings from db
    data = await this.app.bean.settings.getInstance({ name: '/groupInfo/slogan' });
    assert.equal(data, 'Less is more, while more is less');

    // ok
    this.app.success();
  }
}
