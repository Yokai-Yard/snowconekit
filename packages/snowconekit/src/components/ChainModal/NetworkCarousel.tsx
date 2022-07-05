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
import { GlassCard } from '../ProfileDetails/ProfileDetails.css';

export interface NetworkCarouselProps {
  activeChain: ReturnType<typeof useNetwork>['chain'];
  chains: ReturnType<typeof useNetwork>['chains'];
  onClose: () => void;
  networkError: ReturnType<typeof useSwitchNetwork>['error'];
  onSwitchNetwork?: (chainId: number) => unknown;
  pendingChainId?: ReturnType<typeof useSwitchNetwork>['pendingChainId'];
}

export function NetworkCarousel({
  activeChain,
  chains,
  networkError,
  onClose,
  onSwitchNetwork,
  pendingChainId,
}: NetworkCarouselProps) {
  const { connector: activeConnector } = useAccount();
  const [switchingToChain, setSwitchingToChain] = useState<number | null>();
  const titleId = 'rk_chain_modal_title';
  const mobile = isMobile();
  const rainbowkitChainsById = useRainbowKitChainsById();
  const [chainIndex, setChainIndex] = useState(Number);
  const [activeSlideIndex, setActiveSlideIndex] = useState(chainIndex);

  const stopSwitching = useCallback(() => {
    setSwitchingToChain(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!activeConnector) {
      return;
    }

    const stopSwitching = () => {
      setSwitchingToChain(null);
      onClose();
    };

    let provider: any;
    activeConnector?.getProvider?.().then(provider_ => {
      provider = provider_;
      provider.on('chainChanged', stopSwitching);
    });

    return () => {
      provider?.removeListener('chainChanged', stopSwitching);
    };
  }, [activeConnector, onClose, stopSwitching]);

  useEffect(() => {
    if (networkError && networkError.name === 'UserRejectedRequestError') {
      stopSwitching();
    }
  }, [networkError, stopSwitching]);

  const { appName } = useContext(AppContext);

  if (!activeChain || !activeChain?.id) {
    return null;
  }

  //
  //

  useEffect(() => {
    const activeChainIndex = chains.findIndex(
      chain => chain.id === activeChain?.id
    );
    setChainIndex(activeChainIndex);
    setActiveSlideIndex(chainIndex);
  }, [chainIndex]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="14"
      paddingTop="6"
      paddingBottom="6"
      className={GlassCard}
      style={{
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow:
          '0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%), 0px 3px 14px 2px rgb(145 158 171 / 12%)',
        marginTop: '13px',
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
          style: {
            margin: '5px',
            opacity: '.6',
            position: 'absolute',
            right: 8,
            top: '48%',
            zIndex: 100,
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 26,
            lineHeight: 1,
            width: 26,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: {
            margin: '5px',
            opacity: '.6',
            position: 'absolute',
            left: 8,
            top: '48%',
            zIndex: 100,
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 26,
            lineHeight: 1,
            width: 26,
          },
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
                      <Box
                        style={{
                          width: isCurrentChain ? '38px' : '33px',
                          height: isCurrentChain ? '38px' : '33px',
                          borderRadius: '50%',
                          border: '3px solid white',
                          boxShadow: '2px 2px 4px 2px  rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <AsyncImage
                          alt={chain.name}
                          borderRadius="full"
                          height="full"
                          src={chainIconUrl}
                          width="full"
                        />
                      </Box>
                    ) : null}
                  </Box>

                  {switching && (
                    <Box
                      alignItems="center"
                      display="flex"
                      flexDirection="row"
                      marginRight="6"
                    >
                      <Text color="modalText" size="14" weight="medium">
                        Confirm in Wallet
                      </Text>
                      <Box
                        background="standby"
                        borderRadius="full"
                        height="8"
                        marginLeft="8"
                        width="8"
                      />
                    </Box>
                  )}
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
