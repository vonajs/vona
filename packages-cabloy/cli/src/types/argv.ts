export interface CmdArgv {
  [Prop: string]: any;
  projectPath: string;
  cliFullName: string;
}

export interface CmdContext {
  argv: CmdArgv;
}

export interface CmdOptions {
  command: CmdCommand;
  context: CmdContext;
  terminal: boolean;
}

export interface CmdCommand {
  bean: string;
  info: {
    version: string;
    title: string;
  };
  options: object;
  groups: object | null;
}
