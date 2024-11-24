// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('flow.set01_atomUserTask', () => {
  it('atomUserTask', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // atomClass info
    const atomClassModule = mockModuleInfo().relativeName;
    const atomClassName = 'purchaseOrder';
    const atomClass = { module: atomClassModule, atomClassName };

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // create
    const keyDraft = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/write',
      body: {
        atomClass,
        item: {
          atomName: 'atomUserTask-test',
          _flowDefKey: 'set01_atomUserTask',
        },
      },
    });
    assert(!!keyDraft);

    // submit
    let data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/submit',
      body: {
        key: keyDraft,
        atomClass,
      },
    });
    const flowId = data.flow.id;
    assert(!!flowId);

    // atomFlowId of draft/formal is different
    // // select nothing of formal
    // result = await app
    //   .httpRequest()
    //   .post(mockUrl('/a/base/atom/select'))
    //   .send({
    //     atomClass: { module: atomClassModule, atomClassName },
    //     options: {
    //       where: {
    //         atomFlowId: flowId,
    //       },
    //       stage: 'formal',
    //     },
    //   });
    // assert(result.body.code === 0);
    // let formal = result.body.data.list[0];
    // // not found
    // assert(!formal);

    // select task from history
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/select',
      body: {
        options: {
          where: {
            'a.flowId': flowId,
            'a.flowTaskStatus': 0,
          },
          history: 1,
        },
      },
    });
    let flowTask = data.list[0];
    assert(!!flowTask);

    // select task
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/select',
      body: {
        options: {
          where: {
            'a.flowId': flowId,
            'a.flowTaskStatus': 0,
            'a.specificFlag': 0,
          },
          history: 0,
        },
      },
    });
    flowTask = data.list[0];
    assert(!!flowTask);

    // claim
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/claim',
      body: {
        flowTaskId: flowTask.id,
      },
    });

    // complete
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/complete',
      body: {
        flowTaskId: flowTask.id,
        handle: {
          status: 1,
          remark: 'Nice Work!',
        },
        formAtom: {
          atomName: 'atomUserTask-test!!',
          description: 'modified by userTask',
          _flowDefKey: 'would not been modified',
        },
      },
    });

    // select formal
    data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/select',
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
      url: '/api/a/base/atom/delete',
      body: {
        key: keyFormal,
        atomClass,
      },
    });
  });
});
