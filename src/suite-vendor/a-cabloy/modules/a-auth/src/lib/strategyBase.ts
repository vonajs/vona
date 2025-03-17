export class StrategyBase {
  authenticate(_req, _options) {
    throw new Error('Strategy#authenticate must be overridden by subclass');
  };
}
