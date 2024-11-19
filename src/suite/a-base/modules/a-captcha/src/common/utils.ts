export default {
  getCacheKey({ ctx, providerInstanceId }: any) {
    return `captcha:${ctx.app.bean.user.anonymousId()}:${providerInstanceId}`;
  },
};
