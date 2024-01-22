module.exports = `
class Listener {
  constructor(context) {
    this.context = context;
  }

  async onNodeEnter(contextNode) {
    const x = this.context.vars.get('x');
    if (contextNode._nodeDef.id === 'startEvent_1') {
      // nodeVars
      contextNode.vars.set('x', x);
    }
    if (contextNode._nodeDef.id === 'endEvent_1') {
      // assert
      assert.equal(x, '1');
    }
    if (contextNode._nodeDef.id === 'endEvent_2') {
      // assert
      assert.equal(x, '2');
    }
  }
}
`;
