import type { BeanCliBase } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type GoGoCode from 'gogocode';
import { readFileSync } from 'node:fs';
import path from 'node:path';

type TypeMagicFieldMethod = 'getBy' | 'selectBy';
type TypeMagicFieldOp = '' | 'eqI';
interface IMagicField {
  type: 'auto' | 'number' | 'TableIdentity' | 'string' | 'boolean';
  methods: TypeMagicFieldMethod | Array<TypeMagicFieldMethod>;
  ops?: TypeMagicFieldOp | Array<TypeMagicFieldOp>;
}

// id/name/enabled/disabled/closed/active/current/
const __MagicFields: Record<string, IMagicField> = {
  id: {
    type: 'auto',
    methods: 'getBy',
  },
  name: {
    type: 'string',
    methods: ['getBy', 'selectBy'],
    ops: ['', 'eqI'],
  },
  enabled: {
    type: 'boolean',
    methods: ['getBy', 'selectBy'],
  },
  disabled: {
    type: 'boolean',
    methods: ['getBy', 'selectBy'],
  },
  closed: {
    type: 'boolean',
    methods: ['getBy', 'selectBy'],
  },
  active: {
    type: 'boolean',
    methods: ['getBy', 'selectBy'],
  },
  current: {
    type: 'boolean',
    methods: ['getBy', 'selectBy'],
  },
};

export function __parseMagics(cli: BeanCliBase, ast: GoGoCode.GoGoAST, globFile: IGlobBeanFile, entityName: string) {
  const astImportEntity = ast.find(`import { ${entityName} } from '$$$0'`);
  const fileEntity = path.join(path.dirname(globFile.file), (astImportEntity as any).value.source.value);
  const entityInfo = __parseEntityInfo(cli, fileEntity, entityName);
  const modelInfo = __parseModelInfo(cli, globFile.file, globFile.className);
  console.log(entityInfo);
  console.log(modelInfo);
}

function __parseEntityInfo(cli: BeanCliBase, fileEntity: string, entityName: string) {
  const content = readFileSync(fileEntity).toString();
  const regexpSimple = new RegExp(`export class ${entityName} extends.*?EntityBaseSimple.*?{`);
  const regexpBase = new RegExp(`export class ${entityName} extends.*?EntityBase.*?{`);
  let idType;
  if (content.match(regexpSimple)) {
    idType = 'number';
  } else if (content.match(regexpBase)) {
    idType = 'TableIdentity';
  }
  const ast = cli.helper.gogocode(content);
  const astNodes = ast.find(`export class ${entityName} extends $$$0 {$$$1}`).match.$$$1;
  const fieldNames: string[] = [];
  for (const astNode of astNodes) {
    fieldNames.push((astNode as any).key.name);
  }
  return { idType, fieldNames };
}

function __parseModelInfo(cli: BeanCliBase, fileModel: string, modelName: string) {
  const content = readFileSync(fileModel).toString();
  const ast = cli.helper.gogocode(content);
  const astNodes = ast.find(`export class ${modelName} extends $$$0 {$$$1}`).match.$$$1;
  const fieldNames: string[] = [];
  for (const astNode of astNodes) {
    fieldNames.push((astNode as any).key.name);
  }
  return { fieldNames };
}
