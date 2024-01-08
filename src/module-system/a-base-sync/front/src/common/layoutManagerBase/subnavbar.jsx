export default {
  data() {
    return {
      subnavbar: {
        enable: false,
        render: false, // will render in titlebar if true
      },
    };
  },
  methods: {
    subnavbar_getBlockOptions() {
      const blockConfig = this.layout.config.blocks?.subnavbar;
      if (!blockConfig) return blockConfig;
      return this.layout_getBlockOptions({ blockConfig });
    },
    async subnavbar_policyInit() {
      const res = await this.subnavbar_policyInit_inner();
      if (!res) {
        this.subnavbar.render = false;
        this.subnavbar.enable = false;
      } else {
        this.subnavbar.render = res.render;
        this.subnavbar.enable = res.render ? res.enable : false;
      }
    },
    async subnavbar_policyInit_inner() {
      const blockOptions = this.subnavbar_getBlockOptions();
      if (!blockOptions) return false;
      // policy
      const policy = blockOptions.policy;
      if (policy === 'default') {
        return this.subnavbar_policyDefault();
      } else if (policy === 'custom') {
        return await this.subnavbar_policyCustom();
      }
      // others
      return {
        render: blockOptions.render,
        enable: blockOptions.enable,
      };
    },
    subnavbar_policyDefault() {
      const blockOptions = this.subnavbar_getBlockOptions();
      // render
      let render = blockOptions.render;
      if (render === undefined || render === null) {
        if (this.subnavbar_policyDefaultCalc_render) {
          render = this.subnavbar_policyDefaultCalc_render();
        }
        if (render === undefined || render === null) {
          render = true;
        }
      }
      // enable
      let enable = blockOptions.enable;
      if (enable === undefined || enable === null) {
        if (this.subnavbar_policyDefaultCalc_enable) {
          enable = this.subnavbar_policyDefaultCalc_enable();
        }
        if (enable === undefined || enable === null) {
          if (!render) {
            enable = false;
          } else {
            enable = ['small', 'medium'].includes(this.$view.size);
          }
        }
      }
      // ok
      return { enable, render };
    },
    async subnavbar_policyCustom() {
      const blockConfig = this.layout.config.blocks?.subnavbar;
      // component
      const _options = this.layout_getBlockComponentOptions({ blockConfig });
      const options = {
        propsData: _options.props,
      };
      const componentInstance = await this.$meta.util.createComponentInstanceByName(blockConfig.component, options);
      try {
        return await componentInstance.onPolicy();
      } finally {
        componentInstance.$destroy();
      }
    },
  },
};
