import type { BeanCliBase } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type GoGoCode from 'gogocode';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ensureArray } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

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
  const { className, file } = globFile;
  const astImportEntity = ast.find(`import { ${entityName} } from '$$$0'`);
  const fileEntity = path.join(path.dirname(file), (astImportEntity as any).value.source.value);
  const entityInfo = __parseEntityInfo(cli, fileEntity, entityName);
  const modelInfo = __parseModelInfo(cli, file, className);
  const contentRecords: string[] = [];
  for (const fieldName in __MagicFields) {
    const magicField = __MagicFields[fieldName];
    if (fieldName === 'id') {
      if (!modelInfo.fieldNames.includes('getById') && entityInfo.idType) {
        contentRecords.push(`getById<T extends IModelGetOptions<${entityName},${className}>>(id: ${entityInfo.idType}, options?: T): Promise<TypeModelRelationResult<${entityName}, ${className}, T> | undefined>;`);
      }
      continue;
    }
    for (const method of ensureArray(magicField.methods)!) {
      const ops = ensureArray(magicField.ops || [''])!;
      for (const op of ops) {
        const actionName = `${method}${toUpperCaseFirstChar(fieldName)}${toUpperCaseFirstChar(op)}`;
        if (modelInfo.fieldNames.includes(actionName)) continue;
        if (method === 'getBy') {
          contentRecords.push(`${actionName}<T extends IModelGetOptions<${entityName},${className}>>(${fieldName}?: ${magicField.type}, options?: T): Promise<TypeModelRelationResult<${entityName}, ${className}, T> | undefined>;`);
        } else if (method === 'selectBy') {
          contentRecords.push(`${actionName}<T extends IModelSelectParams<${entityName},${className},ModelJoins>, ModelJoins extends TypeModelsClassLikeGeneral | undefined = undefined>(${fieldName}?: ${magicField.type}, params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<${entityName}, ${className}, T>[]>;`);
        }
      }
    }
  }
  return contentRecords;
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
