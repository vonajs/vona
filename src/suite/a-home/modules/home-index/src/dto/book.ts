import { IsInt, Length, Max, Min } from 'class-validator';
import { Dto } from 'vona';

@Dto()
export class DtoBook {
  @IsInt()
  @Min(1)
  @Max(6)
  id: number;

  @Length(1, 3)
  name: string;
}
