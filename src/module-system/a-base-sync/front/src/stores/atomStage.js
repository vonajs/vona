export default {
  state() {
    return {
      stages: ['draft', 'formal', 'history'],
    };
  },
  actions: {
    toNumber({ atomStage }) {
      if (atomStage === undefined || atomStage === null) return atomStage;
      if (typeof atomStage === 'number') return atomStage;
      const index = this.stages.findIndex(atomStage);
      return index === -1 ? null : index;
    },
    toString({ atomStage }) {
      if (atomStage === undefined || atomStage === null) return atomStage;
      if (typeof atomStage === 'string') return atomStage;
      return this.stages[atomStage];
    },
  },
};
