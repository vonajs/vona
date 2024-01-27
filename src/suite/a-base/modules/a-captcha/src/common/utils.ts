export default {
  getCacheKey({ ctx, providerInstanceId }: any) {
    return `captcha:${ctx.bean.user.anonymousId()}:${providerInstanceId}`;
  },
};
