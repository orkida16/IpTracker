import {TTransformedIpInfo} from '../types/shared';

export const toTransformedIpInfo = (item: any): TTransformedIpInfo => {
  return {
    ip: item.ip ?? null,
    city: item.city ?? null,
    country_name: item.country ?? null,
    utc_offset: item.timezone.utc ?? null,
    org: item.connection.org ?? null,
  };
};
