import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { Dialog } from '../Dialog/Dialog';
import { TxDialogContent } from './TxDialogContent';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { PushSpinner, SphereSpinner } from 'react-spinners-kit';
import { CopiedIcon } from '../Icons/Copied';
import * as styles from './TxDialog.css';
import type { Transaction } from '../../transactions/transactionStore';
import { CloseButton } from '../CloseButton/CloseButton';
import { useAccount, useNetwork } from 'wagmi';
import TxStatusImage from './TxStatusImage';
import { StatusBox, BoxInfo } from './StatusBox.css';
import { touchableStyles } from '../../css/touchableStyles';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { TxBg } from '../Icons/txBackground';
import CheckIcon from '../Icons/check.svg';

interface TxProps {
  transactionStatus: Transaction['status'];
  mobile: boolean;
  onClose: () => void;
  chainIconBackground?: string;
  address: ReturnType<typeof useAccount>['address'];
  activeChain: ReturnType<typeof useNetwork>['chain'];
  rocketUrl?: string;
}

export function TxItem({
  transactionStatus,
  mobile,
  onClose,
  chainIconBackground,
  address,
  activeChain,
  rocketUrl,
}: TxProps) {
  const pendingTx = transactionStatus === 'pending';
  const confirmedTx = transactionStatus === 'confirmed';
  const confirmationStatus =
    transactionStatus === 'confirmed' ? (
      mobile ? (
        <Box style={{ color: 'white', marginTop: '19px' }}>
          <CopiedIcon />
        </Box>
      ) : (
        'Transaction Confirmed'
      )
    ) : transactionStatus === 'failed' ? (
      'Transaction Failed'
    ) : (
      `Awaiting Confirmations on ${activeChain?.name} Network`
    );
  const { chain: chain } = useNetwork();
  const explorerLink = chainToExplorerUrl(chain);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      style={{
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        width="full"
        paddingRight="10"
        height="40"
        overflow="hidden"
        style={{
          background: `linear-gradient(52deg, ${chainIconBackground} 20 0%,  ${chainIconBackground} 40 100%)`,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <CloseButton onClose={onClose} background={false} />
      </Box>
      <TxBg>
        <Box display="flex" flexDirection="column" alignItems="center">
          {!mobile && activeChain ? (
            rocketUrl && (
              <Box
                className={pendingTx ? styles.onEnter : styles.onExit}
                style={{
                  width: '75px',
                  height: '123px',
                  marginTop: '70px',
                }}
              >
                <object type="image/svg+xml" data={rocketUrl}>
                  svg-animation
                </object>
              </Box>
            )
          ) : (
            <Box style={{ marginBottom: '10px', paddingTop: '10px' }}>
              {pendingTx ? (
                <Box paddingBottom="6" paddingTop="4">
                  <SphereSpinner size={18} style={{ padding: 0, margin: 0 }} />
                </Box>
              ) : (
                <img
                  src={CheckIcon}
                  alt="Check Mark"
                  style={{
                    width: '24px',
                    height: '24px',
                    padding: 0,
                    margin: 0,
                  }}
                />
              )}
            </Box>
          )}
          {mobile ? null : (
            <Box className={StatusBox}>
              <Box className={BoxInfo}>
                <Box
                  style={{
                    alignSelf: 'center',
                    width: '200px',
                  }}
                >
                  <Text color="modalText" font="body" size="16" weight="medium">
                    {confirmationStatus}
                  </Text>
                  {/* {explorerLink && ( */}
                  <Box paddingX={mobile ? '8' : '18'} />
                  {/* )} */}
                </Box>

                <Box style={{ paddingTop: '20px' }}>
                  <TxStatusImage transactionStatus={transactionStatus} />
                </Box>
              </Box>

              <Box
                as="a"
                background={{ hover: 'profileForeground' }}
                borderRadius="menuButton"
                className={touchableStyles({ active: 'shrink' })}
                color="modalTextDim"
                display="flex"
                flexDirection="row"
                href={`${explorerLink}/address/${address}`}
                justifyContent="flex-start"
                paddingX="28"
                paddingBottom="16"
                rel="noreferrer noopener"
                style={{ willChange: 'transform' }}
                target="_blank"
                transition="default"
                width="full"
                {...(mobile ? { paddingLeft: '12' } : {})}
              >
                <Text
                  color="modalTextSecondary"
                  font="body"
                  size={mobile ? '16' : '14'}
                  weight="semibold"
                >
                  View on Explorer
                </Text>
                <Box paddingLeft="8">
                  <ExternalLinkIcon />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </TxBg>
    </Box>
  );
}
