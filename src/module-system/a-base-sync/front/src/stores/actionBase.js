export default {
  state() {
    return {};
  },
  actions: {
    translateText({ ctx, text, item }) {
      if (!text) return text;
      return ctx.$meta.util.replaceTemplate(ctx.$text(text), item);
    },
    getDialogTitle({ ctx, action, item }) {
      // action params
      const actionParamsDialog = action.params?.dialog || {};
      const title = this.translateText({ ctx, text: actionParamsDialog.title, item });
      if (title) return title;
      // atomName
      const atomName = item.atomNameLocale || item.atomName;
      if (!atomName) return action.titleLocale;
      return `${action.titleLocale}: ${atomName}`;
    },
  },
};
