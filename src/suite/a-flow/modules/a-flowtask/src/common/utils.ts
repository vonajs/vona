export default ({ ctx /* flowInstance*/ }: any) => {
  class Utils {
    context: any;
    contextNode: any;
    contextTask: any;

    constructor({ context, contextNode, contextTask }: any) {
      this.context = context;
      this.contextNode = contextNode;
      this.contextTask = contextTask;
    }

    async executeService({ bean, parameter }: any) {
      const globals: any = {};
      if (this.context) globals.context = this.context;
      if (this.contextNode) globals.contextNode = this.contextNode;
      if (this.contextTask) globals.contextTask = this.contextTask;
      return await ctx.app.bean.flow.executeService({
        bean,
        parameter,
        globals,
      });
    }
  }
  return Utils;
};
