export default {
  getCacheKey({ ctx, providerInstanceId }) {
    return `captcha:${ctx.bean.user.anonymousId()}:${providerInstanceId}`;
  },
};
