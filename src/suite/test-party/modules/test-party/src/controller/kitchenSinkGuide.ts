import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerKitchenSinkGuide extends BeanBase {
  async echo() {
    const message = 'Hello World';
    this.app.success(message);
  }

  async echo2() {
    const message = this.scope.config.message;
    this.app.success(message);
  }

  async echo3() {
    const message = this.scope.locale['Hello World']();
    this.app.success(message);
  }

  async echo4() {
    const { message, markCount } = this.ctx.request.body;
    const res = `${message}${new Array(markCount + 1).join('!')}`;
    this.app.success(res);
  }

  async echo6() {
    // testParty: insert/udpate/delete/get

    // insert
    const res = await this.bean.model.insert('testParty', {
      iid: this.ctx.instance.id,
      deleted: 0,
      personCount: 3,
    });
    const id = res[0];
    // update
    await this.bean.model.update('testParty', {
      id,
      personCount: 5,
    });
    // get
    const item = await this.bean.model.get('testParty', {
      id,
    });
    // delete
    await this.bean.model.delete('testParty', {
      id,
    });
    // ok
    this.app.success(item);
  }

  async echo7() {
    // testParty: insert/udpate/delete/get

    // insert
    const res = await this.scope.model.party.insert({ personCount: 3 });
    const id = res[0];
    // update
    await this.scope.model.party.update({ id, personCount: 6 });
    // get
    const item = await this.scope.model.party.get({ id });
    // delete
    await this.scope.model.party.delete({ id });
    // ok
    this.app.success(item);
  }

  async echo8() {
    // transaction

    // insert
    const res = await this.scope.model.party.insert({ personCount: 3 });
    const id = res[0];
    // will throw error
    await this.scope.model.party.update({ id, personCountA: 6 });
    // never here
    this.app.success();
  }

  async echo9() {
    // Menu Authorization
    // ok
    this.app.success('ok');
  }
}
