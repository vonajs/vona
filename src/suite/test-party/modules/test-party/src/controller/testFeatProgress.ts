import { BeanBase, sleep } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestFeatProgress extends BeanBase {
  async progress() {
    // create progress
    const progressId = await this.app.bean.progress.create();
    // background
    this.bean.executor.runInBackground(async () => {
      await this._progressInBackground({ progressId });
    });
    // return progressId
    this.app.success({ progressId });
  }

  async _progressInBackground({ progressId }: any) {
    try {
      // level one
      await this._levelOne({ progressId, progressNo: 0 });
      // progress done
      await this.app.bean.progress.done({ progressId, message: this.app.text('WellDone') });
      // ok
      this.app.success(true);
    } catch (err: any) {
      // progress error
      await this.app.bean.progress.error({ progressId, message: err.message });
      // throw err
      throw err;
    }
  }

  async _levelOne({ progressId, progressNo }: any) {
    const total = 2;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.app.text('LevelOne')}: ${i + 1}`;
      await this.app.bean.progress.update({
        progressId,
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await sleep(1500);
      // level two
      await this._levelTwo({ progressId, progressNo: progressNo + 1 });
    }
  }

  async _levelTwo({ progressId, progressNo }: any) {
    const total = 2;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.app.text('LevelTwo')}: ${i + 1}`;
      await this.app.bean.progress.update({
        progressId,
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await sleep(1500);
      // level two
      await this._levelThree({ progressId, progressNo: progressNo + 1 });
    }
  }

  async _levelThree({ progressId, progressNo }: any) {
    const total = 3;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.app.text('LevelThree')}: ${i + 1}`;
      await this.app.bean.progress.update({
        progressId,
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await sleep(1500);
    }
  }
}
