import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { Model<%=argv.resourceNameCapitalize%> } from '../model/<%=argv.resourceName%>.ts';

export interface IDtoOptions<%=argv.resourceNameCapitalize%>QueryRes extends IDecoratorDtoOptions {}

@Dto<IDtoOptions<%=argv.resourceNameCapitalize%>QueryRes>()
export class Dto<%=argv.resourceNameCapitalize%>QueryRes extends $Dto.selectAndCount(() => Model<%=argv.resourceNameCapitalize%>) {}
