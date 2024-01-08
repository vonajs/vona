export default {
  data() {
    return {
      bottombar: {
        enable: false,
      },
    };
  },
  methods: {
    bottombar_getBlockOptions() {
      const blockConfig = this.layout.config.blocks?.bottombar;
      if (!blockConfig) return blockConfig;
      return this.layout_getBlockOptions({ blockConfig });
    },
    async bottombar_policyInit() {
      const res = await this.bottombar_policyInit_inner();
      if (!res) {
        this.bottombar.enable = false;
      } else if (res === true) {
        this.bottombar.enable = true;
      } else {
        this.bottombar.enable = res.enable;
      }
    },
    async bottombar_policyInit_inner() {
      const blockOptions = this.bottombar_getBlockOptions();
      if (!blockOptions) return false;
      // enable
      let enable = blockOptions.enable;
      if (enable === undefined || enable === null) {
        enable = true;
      }
      // others
      return enable;
    },
  },
};
