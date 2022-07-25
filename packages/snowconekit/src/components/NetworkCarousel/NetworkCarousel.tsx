import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box, BoxProps } from '../Box/Box';
import { CarouselButton } from '../MenuButton/CarouselButton';
import { useRainbowKitChainsById } from '../SnowConeKitProvider/SnowConeKitChainContext';
import { Text } from '../Text/Text';
import ReactSimplyCarousel from 'react-simply-carousel';
import {
  GlassCard,
  Carousel,
  BackBtn,
  ForwardBtn,
  CarouselAvatar,
} from './NetworkCarousel.css';
import { DropdownIcon } from '../Icons/Dropdown';
import { ThemeContext } from '../SnowConeKitProvider/SnowConeKitProvider';

export interface NetworkCarouselProps {
  activeChain: ReturnType<typeof useNetwork>['chain'];
  chains: ReturnType<typeof useNetwork>['chains'];
  networkError: ReturnType<typeof useSwitchNetwork>['error'];
  onSwitchNetwork?: (chainId: number) => unknown;
}

export interface IconClassesProps {
  isCurrentChain: boolean;
  switching: boolean;
  switchingToChain: number | null | undefined;
}

const chainIconClasses = ({
  isCurrentChain,
  switching,
  switchingToChain,
}: IconClassesProps) => {
  const isOld = isCurrentChain && !switching && switchingToChain;
  const opacity = (isCurrentChain || switching) && !isOld ? '1' : '0.5';
  const size = isCurrentChain || switching ? '38px' : '33px';

  const chainIcon = {
    width: size,
    height: size,
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '3px 3px 3px  rgba(0, 0, 0, 0.3)',
    filter: 'drop-shadow(1.79px 1.79px 3.58px rgba(0, 0, 0, 0.33))',
    opacity: opacity,
  };

  return chainIcon;
};

export function NetworkCarousel({
  activeChain,
  chains,
  networkError,
  onSwitchNetwork,
}: NetworkCarouselProps) {
  const { connector: activeConnector } = useAccount();
  const theme = useContext(ThemeContext);

  const isLightMode = theme?.colors?.modalBackground === '#FFFFFF';

  const [switchingToChain, setSwitchingToChain] = useState<number | null>();
  const titleId = 'rk_chain_modal_title';
  const mobile = isMobile();
  const snowconekitChainsById = useRainbowKitChainsById();
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    chains.findIndex(chain => chain.id === activeChain?.id)
  );

  const stopSwitching = useCallback(() => {
    setSwitchingToChain(null);
    setActiveSlideIndex(
      chains.findIndex(chain => chain.id === activeChain?.id)
    );
  }, [networkError]);

  useEffect(() => {
    if (!activeConnector) {
      return;
    }

    const stopSwitching = () => {
      setSwitchingToChain(null);
    };

    let provider: any;
    activeConnector?.getProvider?.().then(provider_ => {
      provider = provider_;
      provider.on('chainChanged', stopSwitching);
    });

    return () => {
      provider?.removeListener('chainChanged', stopSwitching);
    };
  }, [activeConnector, networkError, stopSwitching]);

  useEffect(() => {
    if (networkError && networkError.name === 'UserRejectedRequestError') {
      stopSwitching();
    }
  }, [networkError, stopSwitching]);

  if (!activeChain || !activeChain?.id) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingTop="6"
      paddingBottom="6"
      className={[GlassCard, Carousel]}
      style={{
        border: isLightMode
          ? '1px solid rgba( 255, 255, 255, 0.68 )'
          : '1px solid rgba( 0, 0, 0, 0.68 )',
        background: isLightMode
          ? 'linear-gradient(112deg, rgba(255, 255, 255,0.2) 0%, rgba(255, 255, 255,0.0) 100%)'
          : 'linear-gradient(112deg, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0,0.0) 100%)',
      }}
    >
      <Box paddingBottom="0" paddingLeft="10" paddingTop="4">
        <Text
          as="h1"
          color="accentColorForeground"
          id={titleId}
          size={mobile ? '18' : '14'}
          weight="medium"
        >
          Switch Network
        </Text>
      </Box>
      <ReactSimplyCarousel
        centerMode={true}
        updateOnItemClick={true}
        hideNavIfAllVisible={true}
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={5}
        itemsToScroll={1}
        itemsListProps={{
          style: {
            paddingBottom: '5px',
          },
        }}
        forwardBtnProps={{
          style: ForwardBtn,
          children: (
            <Box
              style={{
                transform: 'rotate(270deg)',
                paddingTop: -1,
                marginLeft: '-4px',
              }}
            >
              <DropdownIcon />
            </Box>
          ),
        }}
        backwardBtnProps={{
          style: BackBtn,
          children: (
            <Box
              style={{
                transform: 'rotate(90deg)',
                paddingBottom: 1,
                paddingRight: 2,
                marginRight: '-4px',
              }}
            >
              <DropdownIcon />
            </Box>
          ),
        }}
        responsiveProps={[
          {
            itemsToShow: 5,
            itemsToScroll: 1,
          },
        ]}
        speed={400}
        easing="ease"
      >
        {chains.map((chain, idx) => {
          const isCurrentChain = chain.id === activeChain?.id;
          const switching = chain.id === switchingToChain;
          const rainbowKitChain = snowconekitChainsById[chain.id];
          const chainIconSize: BoxProps['width'] = mobile ? '36' : '28';
          const chainIconUrl = rainbowKitChain?.iconUrl;
          const chainIcon = chainIconClasses({
            isCurrentChain,
            switching,
            switchingToChain,
          });
          return (
            <Box key={chain.id}>
              <CarouselButton
                className="item"
                currentlySelected={isCurrentChain}
                onClick={
                  isCurrentChain
                    ? undefined
                    : () => {
                        setSwitchingToChain(chain.id);
                        onSwitchNetwork && onSwitchNetwork(chain.id);
                      }
                }
              >
                <Box
                  marginTop="10"
                  alignItems="center"
                  display="flex"
                  height={chainIconSize}
                  style={{
                    paddingInline: mobile ? '16px' : '4px',
                  }}
                >
                  {chainIconUrl ? (
                    <Box style={chainIcon}>
                      <AsyncImage
                        alt={chain.name}
                        borderRadius="full"
                        height="full"
                        src={chainIconUrl}
                        width="full"
                      />
                      <Box className={CarouselAvatar} />
                    </Box>
                  ) : null}
                </Box>
              </CarouselButton>
              {mobile && idx < chains?.length - 1 && (
                <Box background="generalBorderDim" height="1" marginX="8" />
              )}
            </Box>
          );
        })}
      </ReactSimplyCarousel>
    </Box>
  );
}

export default NetworkCarousel;

function e(e: any) {
  throw new Error('Function not implemented.');
}
