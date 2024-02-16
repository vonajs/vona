// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('flow.set01_startEventAtom', () => {
  it('startEventAtom', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // atomClass info
    const atomClassModule = mockInfo().relativeName;
    const atomClassName = 'purchaseOrder';
    const atomClass = { module: atomClassModule, atomClassName };

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // create
    const keyDraft = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/base/atom/write',
      body: {
        atomClass,
        item: {
          atomName: 'startEventAtom-test',
          _flowDefKey: 'set01_startEventAtom',
        },
      },
    });
    assert(!!keyDraft);

    // submit
    let data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/base/atom/submit',
      body: {
        key: keyDraft,
        atomClass,
      },
    });
    // const flowId = data.flow.id;
    // assert(!!flowId);

    // select
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/base/atom/select',
      body: {
        atomClass,
        options: {
          where: {
            atomIdDraft: keyDraft.atomId,
            // atomFlowId: flowId,  // atomFlowId of draft/formal is different
          },
          stage: 'formal',
        },
      },
    });
    const formal = data.list[0];
    const keyFormal = { atomId: formal.atomId };

    // delete
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/base/atom/delete',
      body: {
        key: keyFormal,
        atomClass,
      },
    });
  });
});
