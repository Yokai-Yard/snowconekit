import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box, BoxProps } from '../Box/Box';
import { CarouselButton } from '../MenuButton/CarouselButton';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { useRainbowKitChainsById } from '../RainbowKitProvider/RainbowKitChainContext';
import { Text } from '../Text/Text';
import ReactSimplyCarousel from 'react-simply-carousel';
import {
  GlassCard,
  carousel,
  backBtn,
  forwardBtn,
} from './NetworkCarousel.css';

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

  const styles = {
    width: size,
    height: size,
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '2px 2px 4px 2px  rgba(0, 0, 0, 0.3)',
    opacity: opacity,
  };

  return styles;
};

export function NetworkCarousel({
  activeChain,
  chains,
  networkError,
  onSwitchNetwork,
}: NetworkCarouselProps) {
  const { connector: activeConnector } = useAccount();
  const [switchingToChain, setSwitchingToChain] = useState<number | null>();
  const titleId = 'rk_chain_modal_title';
  const mobile = isMobile();
  const rainbowkitChainsById = useRainbowKitChainsById();
  const [activeSlideIndex, setActiveSlideIndex] = useState(
    chains.findIndex(chain => chain.id === activeChain?.id)
  );

  const stopSwitching = useCallback(() => {
    setSwitchingToChain(null);
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

  const { appName } = useContext(AppContext);

  if (!activeChain || !activeChain?.id) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="14"
      paddingTop="6"
      paddingBottom="6"
      className={[GlassCard, carousel]}
    >
      <Box paddingBottom="0" paddingLeft="10" paddingTop="4">
        <Text
          as="h1"
          color="accentColorForeground"
          id={titleId}
          size={mobile ? '18' : '14'}
          weight="medium"
        >
          Switch Networks
        </Text>
      </Box>
      <ReactSimplyCarousel
        centerMode={true}
        updateOnItemClick={true}
        hideNavIfAllVisible={false}
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
          style: forwardBtn,
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: backBtn,
          children: <span>{`<`}</span>,
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
        {onSwitchNetwork ? (
          chains.map((chain, idx) => {
            const isCurrentChain = chain.id === activeChain?.id;
            const switching = chain.id === switchingToChain;
            const rainbowKitChain = rainbowkitChainsById[chain.id];
            const chainIconSize: BoxProps['width'] = mobile ? '36' : '28';
            const chainIconUrl = rainbowKitChain?.iconUrl;
            const styles = chainIconClasses({
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
                          onSwitchNetwork(chain.id);
                        }
                  }
                >
                  <Box
                    style={{
                      paddingInline: mobile ? '16px' : '5px',
                    }}
                    alignItems="center"
                    display="flex"
                    height={chainIconSize}
                  >
                    {chainIconUrl ? (
                      <Box style={styles}>
                        <AsyncImage
                          alt={chain.name}
                          borderRadius="full"
                          height="full"
                          src={chainIconUrl}
                          width="full"
                          loading={switching}
                        />
                      </Box>
                    ) : null}
                  </Box>
                </CarouselButton>
                {mobile && idx < chains?.length - 1 && (
                  <Box background="generalBorderDim" height="1" marginX="8" />
                )}
              </Box>
            );
          })
        ) : (
          <Box
            background="generalBorder"
            borderRadius="menuButton"
            paddingX="18"
            paddingY="12"
          >
            <Text color="modalText" size="14" weight="medium">
              Your wallet does not support switching networks from{' '}
              {appName ?? 'this app'}. Try switching networks from within your
              wallet instead.
            </Text>
          </Box>
        )}
      </ReactSimplyCarousel>
    </Box>
    // </Box>
  );
}

export default NetworkCarousel;

function e(e: any) {
  throw new Error('Function not implemented.');
}
