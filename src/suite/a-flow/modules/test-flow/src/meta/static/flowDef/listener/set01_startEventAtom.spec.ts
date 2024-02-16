export default `
class Listener {
  constructor(context) {
    this.context = context;
  }

  async onNodeEnter(contextNode) {
    if (contextNode._nodeDef.id === 'startEvent_1') {
      const _flowDefKey = this.context.atom._flowDefKey;
      assert.equal(_flowDefKey, 'set01_startEventAtom');
    }
  }
}
`;
