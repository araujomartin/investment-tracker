export const AssetTypeKey = {
  CEDEARS: 'CEDEARS',
  ACTION: 'ACTION',
  SHARE: 'SHARE',
  CRYPTO: 'CRYPTO',
  FIAT: 'FIAT',
} as const;

export type AssetType = (typeof AssetTypeKey)[keyof typeof AssetTypeKey];
