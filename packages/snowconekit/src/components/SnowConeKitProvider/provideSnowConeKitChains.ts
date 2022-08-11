import { isNotNullish } from '../../utils/isNotNullish';
import type { SnowconeKitChain } from './SnowConeKitChainContext';

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
type ChainName =
  | 'arbitrum'
  | 'arbitrumRinkeby'
  | 'avalanche'
  | 'fuji'
  | 'goerli'
  | 'hardhat'
  | 'kovan'
  | 'localhost'
  | 'mainnet'
  | 'optimism'
  | 'optimismKovan'
  | 'polygon'
  | 'polygonMumbai'
  | 'rinkeby'
  | 'ropsten';

type IconMetadata = {
  iconUrl: () => Promise<string>;
  iconBackground: string;
};

type ChainMetadata = {
  chainId: number;
} & IconMetadata &
  ChainRocket;

type ChainRocket = {
  rocketUrl: () => Promise<string>;
};

const arbitrumIcon: IconMetadata = {
  iconBackground: '#96bedc',
  iconUrl: async () => (await import('./chainIcons/arbitrum.svg')).default,
};

const arbitrumRocket = {
  rocketUrl: async () =>
    (await import('../../../assets/rockets/arbitrumRocketAnimated.svg'))
      .default,
};

const avalancheIcon: IconMetadata = {
  iconBackground: '#e84141',
  iconUrl: async () => (await import('./chainIcons/avalanche.svg')).default,
};

const avalancheRocket = {
  rocketUrl: async () =>
    (await import('../../../assets/rockets/avaxRocketAnimated.svg')).default,
};

const ethereumIcon: IconMetadata = {
  iconBackground: '#484c50',
  iconUrl: async () => (await import('./chainIcons/ethereum.svg')).default,
};

const ethereumRocket = {
  rocketUrl: async () =>
    (await import('../../../assets/rockets/ethRocketAnimated.svg')).default,
};

const hardhatIcon: IconMetadata = {
  iconBackground: '#f9f7ec',
  iconUrl: async () => (await import('./chainIcons/hardhat.svg')).default,
};

const hardhatRocket = {
  rocketUrl: async () =>
    (await import('../../../assets/rockets/defaultRocketAnimated.svg')).default,
};

const optimismIcon: IconMetadata = {
  iconBackground: '#ff5a57',
  iconUrl: async () => (await import('./chainIcons/optimism.svg')).default,
};

const optimismRocket = {
  rocketUrl: async () =>
    (await import('../../../assets/rockets/optimismRocketAnimated.svg'))
      .default,
};

const polygonIcon: IconMetadata = {
  iconBackground: '#9f71ec',
  iconUrl: async () => (await import('./chainIcons/polygon.svg')).default,
};

const polygonRocket = {
  rocketUrl: async () =>
    (await import('../../../assets/rockets/polyRocketAnimated.svg')).default,
};

const chainMetadataByName: Record<ChainName, ChainMetadata | null> = {
  arbitrum: { chainId: 42_161, ...arbitrumIcon, ...arbitrumRocket },
  arbitrumRinkeby: { chainId: 421_611, ...arbitrumIcon, ...arbitrumRocket },
  avalanche: { chainId: 43_114, ...avalancheIcon, ...avalancheRocket },
  fuji: { chainId: 43_113, ...avalancheIcon, ...avalancheRocket },
  goerli: { chainId: 5, ...ethereumIcon, ...ethereumRocket },
  hardhat: { chainId: 31_337, ...hardhatIcon, ...hardhatRocket },
  kovan: { chainId: 42, ...ethereumIcon, ...ethereumRocket },
  localhost: { chainId: 1_337, ...ethereumIcon, ...ethereumRocket },
  mainnet: { chainId: 1, ...ethereumIcon, ...ethereumRocket },
  optimism: { chainId: 10, ...optimismIcon, ...optimismRocket },
  optimismKovan: { chainId: 69, ...optimismIcon, ...optimismRocket },
  polygon: { chainId: 137, ...polygonIcon, ...polygonRocket },
  polygonMumbai: { chainId: 80_001, ...polygonIcon, ...polygonRocket },
  rinkeby: { chainId: 4, ...ethereumIcon, ...ethereumRocket },
  ropsten: { chainId: 3, ...ethereumIcon, ...ethereumRocket },
};

const chainMetadataById = Object.fromEntries(
  Object.values(chainMetadataByName)
    .filter(isNotNullish)
    .map(({ chainId, ...metadata }) => [chainId, metadata])
);

/** @description Decorates an array of wagmi `Chain` objects with SnowConeKitChain properties if not already provided */
export const provideSnowconeKitChains = <Chain extends SnowconeKitChain>(
  chains: Chain[]
): Chain[] =>
  chains.map(chain => ({
    ...(chainMetadataById[chain.id] ?? {}),
    ...chain,
  }));
