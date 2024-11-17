import { Dto } from 'vona';
import { Rule, RuleType } from 'vona-module-a-validator';

@Dto()
export class DtoBook {
  @Rule(RuleType.number())
  id: number;

  @Rule(RuleType.string())
  name: string;
}
