export default ({ ctx /* flowInstance*/ }) => {
  class Utils {
    context: any;
    contextNode: any;
    contextEdge: any;

    constructor({ context, contextNode, contextEdge }) {
      this.context = context;
      this.contextNode = contextNode;
      this.contextEdge = contextEdge;
    }

    async executeService({ bean, parameter }) {
      const globals = {};
      if (this.context) globals.context = this.context;
      if (this.contextNode) globals.contextNode = this.contextNode;
      if (this.contextEdge) globals.contextEdge = this.contextEdge;
      return await ctx.bean.flow.executeService({
        bean,
        parameter,
        globals,
      });
    }
  }
  return Utils;
};
