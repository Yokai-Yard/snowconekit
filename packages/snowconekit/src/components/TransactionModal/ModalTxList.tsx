import React, { useContext } from 'react';
import { useNetwork } from 'wagmi';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { AppContext } from '../SnowConeKitProvider/AppContext';
import { Text } from '../Text/Text';
import { ModalTxItem } from './ModalTxItem';
import { ExplorerLink, ModalList } from './ModalTxs.css';

const NUMBER_OF_VISIBLE_TXS = 3;

interface ModalTxListProps {
  address: string;
  chains: ReturnType<typeof useNetwork>['chains'];
}

export function ModalTxList({ address }: ModalTxListProps) {
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
        className={ModalList}
        paddingX={mobile ? '8' : '18'}
        background="connectButtonBackground"
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
          as="a"
          className={ExplorerLink}
          display="flex"
          href={`${explorerLink}/address/${address}`}
          rel="noreferrer"
          target="_blank"
          paddingX={mobile ? '8' : '18'}
          background="connectButtonBackground"
        >
          <Box
            alignItems="center"
            borderRadius="menuButton"
            color="modalTextDim"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            paddingX="8"
            paddingTop="6"
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
      )}
    </>
  );
}
