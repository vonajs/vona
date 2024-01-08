export default {
  props: {
    layoutManager: {
      type: Object,
    },
    layout: {
      type: Object,
    },
    layoutItems: {
      type: Object,
    },
    info: {
      type: Object,
    },
  },
  methods: {
    base_getDataKey(options) {
      // column
      const column = options?.column || this.info.column;
      return column.dataKey || column.dataIndex;
    },
    base_getParam({ name, column }) {
      // column
      column = column || this.info.column;
      return this.$meta.util.getPropertyDeprecate(column, `params.${name}`, `component.options.props.${name}`);
    },
    base_formatText({ text, column }) {
      // column
      column = column || this.info.column;
      // params: default/dateFormat/currency/locale
      const params = column.params || {};
      // null
      if (text === null || text === undefined) {
        text = params.default || '';
      }
      if (text === '') return text;
      // date
      if (typeof text === 'object' && text instanceof Date) {
        return this.$meta.util.formatDateTime(text, params.dateFormat);
      }
      // currency
      if (params.currency) {
        const currency = this.$meta.util.currency(params.currency);
        return currency.format(text);
      }
      // text
      if (params.locale) {
        text = this.$text(text);
      }
      // ok
      return text;
    },
  },
};
