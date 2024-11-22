// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('flow.set02_behaviorOvertime', () => {
  it('behaviorOvertime', async () => {
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
      url: '/a/base/atom/write',
      body: {
        atomClass,
        item: {
          atomName: 'behaviorOverTime-test',
          _flowDefKey: 'set02_behaviorOvertime',
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
    const flowId = data.flow.id;
    assert(!!flowId);

    // sleep first
    await app.bean.util.sleep(8000);

    // activity_1 will be overtime, and transfer to startEvent_1
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
    let flowTask = data.list[0];
    assert.equal(flowTask.flowNodeDefId, 'startEvent_1');

    // handle task and transfer to activity_1

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
          remark: 'Submit again!',
        },
      },
    });

    // handle task immediately

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
    assert.equal(flowTask.flowNodeDefId, 'activity_1');

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
          atomName: 'behaviorOverTime-test!!',
          description: 'modified by userTask',
          _flowDefKey: 'would not been modified',
        },
      },
    });

    // // sleep for verifing the overtime job not running
    // await app.bean.util.sleep(5000);

    // select formal
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
