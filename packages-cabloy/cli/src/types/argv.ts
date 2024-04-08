export interface CmdArgv {
  [Prop: string]: any;
  projectPath: string;
  cliFullName: string;
}

export interface CmdContext {
  argv: CmdArgv;
}
