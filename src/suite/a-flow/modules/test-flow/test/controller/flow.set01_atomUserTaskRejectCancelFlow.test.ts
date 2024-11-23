// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('flow.set01_atomUserTaskRejectCancelFlow', () => {
  // atomClass info
  const atomClassModule = 'test-flow';
  const atomClassName = 'purchaseOrder';
  const atomClass = { module: atomClassModule, atomClassName };

  let flowId;

  it('atomUserTask_submit', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

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
          atomName: 'atomUserTask-rejectCancelFlow-test',
          _flowDefKey: 'set01_atomUserTask',
        },
      },
    });
    assert(!!keyDraft);

    // submit
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/submit',
      body: {
        key: keyDraft,
        atomClass,
      },
    });
    flowId = data.flow.id;
    assert(!!flowId);
  });

  it('atomUserTask_reject', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // select task
    const data = await ctx.meta.util.performAction({
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
    const flowTask = data.list[0];
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

    // complete: rejected
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/complete',
      body: {
        flowTaskId: flowTask.id,
        handle: {
          status: 2,
          remark: 'Rejected',
        },
      },
    });
  });

  it('atomUserTask_cancelFlow', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // select task
    const data = await ctx.meta.util.performAction({
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
    const flowTask = data.list[0];
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

    // cancelFlow
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/cancelFlow',
      body: {
        flowTaskId: flowTask.id,
        handle: {
          // status:3,
          remark: 'Cancelled',
        },
      },
    });
  });

  // it('atomUserTask_clear', async () => {
  //   app.mockSession({});

  //   // login as root
  //   await app.httpRequest().post(mockUrl('/a/auth/passport/a-authsimple/authsimple')).send({
  //     data: {
  //       auth: 'root',
  //       password: '123456',
  //     },
  //   });

  //   // select draft
  //   let result = await app.httpRequest().post(mockUrl('/a/base/atom/select')).send({
  //     atomClass: { module: atomClassModule, atomClassName },
  //     options: {
  //       where: {
  //         atomFlowId: flowId,
  //       },
  //       stage: 'draft',
  //     },
  //   });
  //   assert(result.body.code === 0);
  //   const draft = result.body.data.list[0];
  //   const keyDraft = { atomId: draft.atomId };

  //   // delete
  //   result = await app.httpRequest().post(mockUrl('/a/base/atom/delete')).send({
  //     key: keyDraft,
  //   });
  //   assert(result.body.code === 0);
  // });
});
