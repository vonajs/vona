// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('flow.set04_atomState', () => {
  // atomClass info
  const atomClassModule = 'test-flow';
  const atomClassName = 'purchaseOrder';
  const atomClass = { module: atomClassModule, atomClassName };

  let keyDraft;
  let flowId;

  it('tomson:drafting', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as tomson
    await ctx.meta.mockUtil.login({ auth: 'tomson' });

    // create
    keyDraft = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/base/atom/write',
      body: {
        atomClass,
        item: {
          atomName: 'atomStateFormal-test',
          _flowDefKey: 'set04_atomState',
        },
      },
    });
    assert(!!keyDraft);

    // submit
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/base/atom/submit',
      body: {
        key: keyDraft,
        atomClass,
      },
    });
    flowId = data.flow.id;
    assert(!!flowId);
  });

  it('tom:review', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as tom
    await ctx.meta.mockUtil.login({ auth: 'tom' });

    // select task from history
    let data = await ctx.meta.util.performAction({
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
          // atomName: 'atomUserTask-test!!',
          description: 'modified by userTask',
        },
      },
    });
  });

  it('jane:payMoney', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as jane
    await ctx.meta.mockUtil.login({ auth: 'jane' });

    // select task from history
    let data = await ctx.meta.util.performAction({
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
          remark: 'paid!',
        },
        formAtom: {
          payMoneyAmount: 12000,
        },
      },
    });
  });

  it('jannie:receiveGoods', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as jannie
    await ctx.meta.mockUtil.login({ auth: 'jannie' });

    // select task from history
    let data = await ctx.meta.util.performAction({
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
          remark: 'paid!',
        },
        formAtom: {
          receiveGoodsPics: 'https://pic.url',
        },
      },
    });
  });

  it('tomson:delete', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as tomson
    await ctx.meta.mockUtil.login({ auth: 'tomson' });

    // select formal
    const data = await ctx.meta.util.performAction({
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
