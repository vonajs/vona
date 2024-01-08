/** @module a-base/front/mixins/ebActionBase */

/** ebActionBase
 */
export default {
  /**
   * @property {object} ctx - Generally speaking, it is the caller component
   * @property {object} action - Action info
   * @property {object} item - Action Parameters
   */
  props: {
    ctx: {
      type: Object,
    },
    action: {
      type: Object,
    },
    item: {
      type: Object,
    },
  },
  created() {
    const { ctx } = this.$props;
    if (ctx && ctx.$createElement) {
      this.$createElement = ctx.$createElement;
    }
  },
  beforeDestroy() {
    this.$createElement = null;
  },
  methods: {
    base_translateText({ text, item }) {
      const { ctx } = this.$props;
      const useStoreActionBase = ctx.$store.useSync('a/base/actionBase');
      return useStoreActionBase.translateText({ ctx, text, item });
    },
    base_getDialogTitle() {
      const { ctx, action, item } = this.$props;
      const useStoreActionBase = ctx.$store.useSync('a/base/actionBase');
      return useStoreActionBase.getDialogTitle({ ctx, action, item });
    },
    async base_handleConfirm() {
      const { ctx, action, item } = this.$props;
      // action params
      const actionParamsDialog = action.params?.dialog || {};
      // check confirm: default is true
      if (actionParamsDialog.confirm === false) return;
      // confirm
      const title = this.base_getDialogTitle();
      const message = this.base_translateText({ text: actionParamsDialog.confirmText, item });
      await ctx.$view.dialog.confirm(message, title);
    },
    base_handleToast() {
      const { ctx, action, item } = this.$props;
      // action params
      const actionParamsDialog = action.params?.dialog || {};
      // check toast
      if (actionParamsDialog.toast === false) return;
      // toast
      let message;
      if (actionParamsDialog.toastText) {
        message = this.base_translateText({ text: actionParamsDialog.toastText, item });
      } else {
        message = ctx.$text('Operation Succeeded');
      }
      ctx.$viewAppMethods.toast.show({ text: message });
    },
    base_handleToastBulk({ keysReq, keysRes }) {
      const { ctx, action, item } = this.$props;
      // action params
      const actionParamsDialog = action.params?.dialog || {};
      // check toast
      if (actionParamsDialog.toast === false) return;
      // toast
      let message;
      if (keysRes && keysRes.length < keysReq.length) {
        // toastTextDoneSome
        if (actionParamsDialog.toastTextDoneSome) {
          message = this.base_translateText({ text: actionParamsDialog.toastTextDoneSome, item });
        } else {
          message = ctx.$text('ToastTextDoneSome');
        }
      } else {
        // toastTextDoneAll
        if (actionParamsDialog.toastTextDoneAll) {
          message = this.base_translateText({ text: actionParamsDialog.toastTextDoneAll, item });
        } else {
          message = ctx.$text('Operation Succeeded');
        }
      }
      ctx.$viewAppMethods.toast.show({ text: message });
    },
    async base_handleActionAfter({ key, atomClass }) {
      const { ctx } = this.$props;
      // commands
      const commands = this.base_handleActionAfter_prepareCommands({ paramKey: 'actionAfter' });
      if (commands) {
        this.base_handleActionAfter_invokeCommands({ commands, key, atomClass, actionSource: ctx });
      }
    },
    base_handleActionAfter_prepareCommands({ paramKey }) {
      const { action } = this.$props;
      // action params
      const actionParams = action.params || {};
      // actionAfter
      const actionAfter = actionParams[paramKey];
      if (!actionAfter) return null;
      // commands
      const commands = actionAfter.commands || [];
      // sameAs
      const sameAs = actionAfter.sameAs;
      if (sameAs === 'create') {
        commands.unshift('refresh');
      } else if (sameAs === 'refresh') {
        commands.unshift('refresh');
      } else if (sameAs === 'save') {
        commands.unshift('emitSave');
      } else if (sameAs === 'delete') {
        commands.unshift('emitDelete');
      }
      return commands;
    },
    base_handleActionAfter_invokeCommands({ commands, key, atomClass, actionSource }) {
      const { ctx } = this.$props;
      // loop
      for (const command of commands) {
        if (command === 'refresh') {
          ctx.page_onRefresh();
        } else if (command === 'emitSave') {
          ctx.$meta.eventHub.$emit('atom:action', { key, atomClass, action: { name: 'save' }, actionSource });
        } else if (command === 'emitDelete') {
          ctx.$meta.eventHub.$emit('atom:action', { key, atomClass, action: { name: 'delete' } });
        }
      }
    },
    base_handleActionAfterBulk({ keysRes, atomClass }) {
      const { ctx } = this.$props;
      // clear selection
      ctx.bulk_clearSelectedAtoms({ keysClear: keysRes });
      // commands: actionAfterItem
      if (keysRes) {
        const commands = this.base_handleActionAfter_prepareCommands({ paramKey: 'actionAfterItem' });
        if (commands) {
          for (const keyRes of keysRes) {
            this.base_handleActionAfter_invokeCommands({ commands, key: keyRes, atomClass, actionSource: null });
          }
        }
      }
      // commands: actionAfter
      const commands = this.base_handleActionAfter_prepareCommands({ paramKey: 'actionAfter' });
      if (commands) {
        this.base_handleActionAfter_invokeCommands({ commands, atomClass, actionSource: null });
      }
    },
    async base_handleActionForm() {
      const { ctx, action, item } = this.$props;
      // dataOptions
      const dataOptions = action.dataOptions || {};
      // action form
      const actionParamsForm = action.params?.form;
      if (!actionParamsForm) return false;
      // queries
      const queries = {
        mode: actionParamsForm.mode,
        atomId: item.atomId,
        itemId: item.itemId,
        module: item.module,
        atomClassName: item.atomClassName,
      };
      // formAction
      queries.formAction = action.name;
      // flowTaskId
      if (dataOptions.flowTaskId) {
        queries.flowTaskId = dataOptions.flowTaskId;
      }
      // formActionMain
      if (dataOptions.formActionMain) {
        queries.formActionMain = dataOptions.formActionMain;
      }
      // navigate
      const url = ctx.$meta.util.combineQueries('/a/basefront/atom/item', queries);
      const navigateOptions = Object.assign({ target: '_popup' }, action.navigateOptions);
      ctx.$view.navigate(url, navigateOptions);
      return true;
    },
    base_handleActionFormBulk() {
      const { ctx, action, item } = this.$props;
      // action form
      const actionParamsForm = action.params?.form;
      if (!actionParamsForm) return false;
      // schema
      const schema = actionParamsForm.fieldsRight?.custom;
      if (!schema) return false;
      // title
      const title = this.base_getDialogTitle();
      // queries
      const queries = {
        module: item.module,
        atomClassName: item.atomClassName,
      };
      // formAction
      queries.formAction = action.name;
      // navigate
      const url = ctx.$meta.util.combineQueries('/a/baseaction/formActionBulk', queries);
      const navigateOptions = Object.assign({ target: '_popup' }, action.navigateOptions);
      navigateOptions.context = {
        params: {
          schema,
          title,
          layoutManager: ctx,
        },
      };
      ctx.$view.navigate(url, navigateOptions);
      return true;
    },
    base_prepareOptionsFromDataOptions(options, dataOptions) {
      if (dataOptions.atomIdMain) {
        options.atomIdMain = dataOptions.atomIdMain;
      }
      if (dataOptions.flowTaskId) {
        options.flowTaskId = dataOptions.flowTaskId;
      }
      if (dataOptions.formAction) {
        options.formAction = dataOptions.formAction;
      }
      if (dataOptions.formActionMain) {
        options.formActionMain = dataOptions.formActionMain;
      }
    },
    async base_prepareRoleIdOwner({ params, atomClass }) {
      const { ctx, action } = this.$props;
      // roleIdOwner
      const useStorePreferredRoles = await ctx.$store.use('a/basestore/preferredRoles');
      const roleIdOwner = await useStorePreferredRoles.getPreferredRoleAndCheck({
        ctx,
        atomClass,
        options: { targetEl: action.targetEl },
      });
      // ignore roleIdOwner===undefined
      if (roleIdOwner === null) return null;
      if (roleIdOwner && params) {
        params.roleIdOwner = roleIdOwner;
      }
      return roleIdOwner;
    },
    async base_handleActionSaveSubmit({ actionName }) {
      let { ctx, action, item } = this.$props;
      // onActionSaveBefore: should after createDelay
      //   ctx maybe not layoutManager
      if (ctx.layout && ctx.layout.instanceExtend && ctx.layout.instanceExtend.onActionSaveBefore) {
        await ctx.layout.instanceExtend.onActionSaveBefore(this.$props);
      }
      // key
      let key = { atomId: item.atomId, itemId: item.itemId };
      const isCreateDelay = key.atomId === 0;
      // atomClass
      const atomClass = {
        module: item.module,
        atomClassName: item.atomClassName,
      };
      // atomClassBase
      const useStoreAtomClasses = await ctx.$store.use('a/basestore/atomClasses');
      const atomClassBase = await useStoreAtomClasses.getAtomClassBase({ atomClass });
      // dataOptions
      const dataOptions = action.dataOptions || {};
      // params
      const params = {
        key,
        atomClass,
        item,
        options: {},
      };
      // saveDraftOnly
      if (actionName === 'save') {
        if (!atomClassBase.itemOnly && item.atomStage === 0) {
          params.options.saveDraftOnly = true;
        }
      } else if (actionName === 'submit') {
        params.options.saveDraftOnly = false;
      }
      // roleIdOwner
      if (isCreateDelay) {
        const roleIdOwner = dataOptions.createParams.roleIdOwner;
        if (roleIdOwner) {
          params.roleIdOwner = roleIdOwner;
        }
        params.options.returnItem = true;
      }
      // from data options
      this.base_prepareOptionsFromDataOptions(params.options, dataOptions);
      // write
      const res = await ctx.$api.post('/a/base/atom/write', params);
      // key maybe changed when createDelay
      if (isCreateDelay) {
        key = res.key;
        item = res.item;
      }
      // return
      return { key, item, atomClass, atomClassBase, dataOptions, isCreateDelay };
    },
  },
};
