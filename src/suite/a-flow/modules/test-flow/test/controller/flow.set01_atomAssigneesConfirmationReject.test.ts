// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('flow.set01_atomAssigneesConfirmationReject', () => {
  // atomClass info
  const atomClassModule = 'test-flow';
  const atomClassName = 'purchaseOrder';
  const atomClass = { module: atomClassModule, atomClassName };

  let keyDraft;
  let flowId;
  let taskAssignees;

  it('atomAssigneesConfirmation', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // create
    keyDraft = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/api/a/base/atom/write',
      body: {
        atomClass,
        item: {
          atomName: 'atomAssigneesConfirmationReject-test',
          _flowDefKey: 'set01_atomAssigneesConfirmation',
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
    flowId = data.flow.id;
    assert(!!flowId);

    // select task
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
          },
          history: 0,
        },
      },
    });
    const flowTask = data.list[0];
    assert(!!flowTask);

    // assigneesConfirmation: rejected
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/assigneesConfirmation',
      body: {
        flowTaskId: flowTask.id,
        handle: {
          status: 2,
        },
      },
    });
  });

  it('atomAssigneesConfirmation_startEventAtom_handle', async () => {
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

    // complete
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/complete',
      body: {
        flowTaskId: flowTask.id,
        handle: {
          status: 1,
          remark: 'StartEventAtom-Handle Again',
        },
      },
    });
  });

  it('atomAssigneesConfirmation_confirmation_again', async () => {
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
          },
          history: 0,
        },
      },
    });
    const flowTask = data.list[0];
    assert(!!flowTask);

    // assignees
    taskAssignees = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/assignees',
      body: {
        flowTaskId: flowTask.id,
      },
    });
    assert(!!taskAssignees);

    // assigneesConfirmation: passed
    const assigneesUsers = taskAssignees.users.map(item => item.id);
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowtask/task/assigneesConfirmation',
      body: {
        flowTaskId: flowTask.id,
        handle: {
          status: 1,
          assignees: {
            users: assigneesUsers,
          },
        },
      },
    });
  });

  it('atomAssigneesConfirmation_claim_bidding', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // choose the first assignee
    const taskAssignee = taskAssignees.users[0];

    // login as root
    await ctx.meta.mockUtil.login({ auth: taskAssignee.userName });

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
          atomName: 'assigneesConfirmation-test!!',
          description: 'modified by userTask',
          _flowDefKey: 'would not been modified',
        },
      },
    });
  });

  it('atomAssigneesConfirmation_clear', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();

    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });

    // select
    const data = await ctx.meta.util.performAction({
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
