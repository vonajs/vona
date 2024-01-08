module.exports = class Queue {
  async execute(context) {
    await this.app.meta._runSchedule(context);
  }
};
