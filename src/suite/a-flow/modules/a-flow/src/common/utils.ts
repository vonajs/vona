export default ({ ctx /* flowInstance*/ }: any) => {
  class Utils {
    context: any;
    contextNode: any;
    contextEdge: any;

    constructor({ context, contextNode, contextEdge }: any) {
      this.context = context;
      this.contextNode = contextNode;
      this.contextEdge = contextEdge;
    }

    async executeService({ bean, parameter }: any) {
      const globals: any = {};
      if (this.context) globals.context = this.context;
      if (this.contextNode) globals.contextNode = this.contextNode;
      if (this.contextEdge) globals.contextEdge = this.contextEdge;
      return await ctx.app.bean.flow.executeService({
        bean,
        parameter,
        globals,
      });
    }
  }
  return Utils;
};
