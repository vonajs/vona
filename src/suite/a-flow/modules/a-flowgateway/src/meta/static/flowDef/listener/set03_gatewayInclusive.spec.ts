module.exports = `
class Listener {
  constructor(context) {
    this.context = context;
  }

  async onNodeEnter(contextNode) {
    if (contextNode._nodeDef.id === 'activity_1') {
      this.context.vars.set('activity_1', true);
    }
    if (contextNode._nodeDef.id === 'activity_2') {
      this.context.vars.set('activity_2', true);
    }
    if (contextNode._nodeDef.id === 'activity_3') {
      this.context.vars.set('activity_3', true);
    }
    if (contextNode._nodeDef.id === 'endEvent_1') {
      const activity_1 = this.context.vars.get('activity_1');
      const activity_2 = this.context.vars.get('activity_2');
      const activity_3 = this.context.vars.get('activity_3');
      // assert
      assert.equal(activity_1, true);
      assert.equal(activity_2, undefined);
      assert.equal(activity_3, true);
    }
  }
}
`;
