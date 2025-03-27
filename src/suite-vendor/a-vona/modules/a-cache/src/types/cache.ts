export interface ICacheRedisGetOptions {
  ttl?: number;
}

export interface ICacheMemGetOptions {
  updateAgeOnGet?: boolean;
  updateAgeOnHas?: boolean;
}
