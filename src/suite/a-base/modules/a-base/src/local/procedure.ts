import { Local } from 'vona';
import { LocalProcedureUtils } from './local.procedure/local.procedure_utils.js';

@Local()
export class LocalProcedure extends LocalProcedureUtils {}
