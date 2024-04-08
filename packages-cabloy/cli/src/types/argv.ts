export interface CmdArgv {
  [Prop: string]: any;
  projectPath: string;
}

export interface CmdContext {
  argv: CmdArgv;
}
