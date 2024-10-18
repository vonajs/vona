import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestFeatProgress extends BeanBase<ScopeModule> {
  async progress() {
    // create progress
    const progressId = await this.ctx.bean.progress.create();
    // background
    this.ctx.meta.util.runInBackground(async ({ ctx }) => {
      const selfInstance = ctx.bean._newBean(ControllerTestFeatProgress);
      await selfInstance._progressInBackground({ progressId });
    });
    // return progressId
    this.ctx.success({ progressId });
  }

  async _progressInBackground({ progressId }: any) {
    try {
      // level one
      await this._levelOne({ progressId, progressNo: 0 });
      // progress done
      await this.ctx.bean.progress.done({ progressId, message: this.ctx.text('WellDone') });
      // ok
      this.ctx.success(true);
    } catch (err: any) {
      // progress error
      await this.ctx.bean.progress.error({ progressId, message: err.message });
      // throw err
      throw err;
    }
  }

  async _levelOne({ progressId, progressNo }: any) {
    const total = 2;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.ctx.text('LevelOne')}: ${i + 1}`;
      await this.ctx.bean.progress.update({
        progressId,
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await this.ctx.bean.util.sleep(1500);
      // level two
      await this._levelTwo({ progressId, progressNo: progressNo + 1 });
    }
  }

  async _levelTwo({ progressId, progressNo }: any) {
    const total = 2;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.ctx.text('LevelTwo')}: ${i + 1}`;
      await this.ctx.bean.progress.update({
        progressId,
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await this.ctx.bean.util.sleep(1500);
      // level two
      await this._levelThree({ progressId, progressNo: progressNo + 1 });
    }
  }

  async _levelThree({ progressId, progressNo }: any) {
    const total = 3;
    let current = 0;
    for (let i = 0; i < total; i++) {
      const text = `${this.ctx.text('LevelThree')}: ${i + 1}`;
      await this.ctx.bean.progress.update({
        progressId,
        progressNo,
        total,
        progress: current++,
        text,
      });
      // sleep
      await this.ctx.bean.util.sleep(1500);
    }
  }
}
