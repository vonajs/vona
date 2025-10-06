type TypeMagicFieldMethod = 'getBy' | 'selectBy';
type TypeMagicFieldOp = '' | 'eqI';
interface IMagicField {
  type: 'auto' | 'string' | 'boolean';
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
