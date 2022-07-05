import React, { useContext } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { Text } from '../Text/Text';
import { ModalTxItem } from './ModalTxItem';

const NUMBER_OF_VISIBLE_TXS = 3;

interface ModalTxListProps {
  address: ReturnType<typeof useAccount>['address'];
  chains: ReturnType<typeof useNetwork>['chains'];
}

export function ModalTxList({ address, chains }: ModalTxListProps) {
  const recentTransactions = useRecentTransactions();
  const { chain: activeChain } = useNetwork();
  const explorerLink = chainToExplorerUrl(activeChain);
  const visibleTxs = recentTransactions.slice(0, NUMBER_OF_VISIBLE_TXS);
  const hasTransactions = visibleTxs.length > 0;
  const mobile = isMobile();
  const { appName } = useContext(AppContext);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="10"
        paddingBottom="2"
        paddingTop="16"
        paddingX={mobile ? '8' : '18'}
        style={{ backgroundColor: 'white', borderRadius: '16px 16px 0 0' }}
      >
        <Box display="flex" flexDirection="column" gap="4">
          {hasTransactions ? (
            visibleTxs.map(tx => {
              return <ModalTxItem key={tx.hash} tx={tx} address={address} />;
            })
          ) : (
            <>
              <Box padding={mobile ? '12' : '8'}>
                <Text
                  color="modalTextDim"
                  size={mobile ? '16' : '14'}
                  weight={mobile ? 'medium' : 'bold'}
                >
                  {appName ?? 'Your'} transactions will appear here...
                </Text>
              </Box>
              {mobile && (
                <Box
                  background="generalBorderDim"
                  height="1"
                  marginX="12"
                  marginY="8"
                />
              )}
            </>
          )}
        </Box>
      </Box>
      {explorerLink && (
        <Box
          paddingX={mobile ? '8' : '18'}
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            height: '62px',
          }}
          background={{ hover: 'profileForeground' }}
        >
          <Box
            as="a"
            borderRadius="menuButton"
            className={increaseHitAreaForHoverTransform.grow}
            display="flex"
            href={`${explorerLink}/address/${address}`}
            rel="noreferrer"
            target="_blank"
          >
            <Box
              alignItems="center"
              borderRadius="menuButton"
              color="modalTextDim"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              paddingX="8"
              paddingY="12"
              style={{ willChange: 'transform' }}
              transform={{
                active: 'shrink',
              }}
              transition="default"
              width="full"
              {...(mobile ? { paddingLeft: '12' } : {})}
            >
              <Text
                color="modalText"
                font="body"
                size={mobile ? '16' : '14'}
                weight={mobile ? 'semibold' : 'bold'}
              >
                View more on Explorer
              </Text>
              <ExternalLinkIcon />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
