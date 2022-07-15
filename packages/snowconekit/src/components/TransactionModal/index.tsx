import React, { useMemo } from 'react';
import { isMobile } from '../../utils/isMobile';
import { Dialog } from '../Dialog/Dialog';
import { TxDialogContent } from '../Dialog/TxDialogContent';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { PushSpinner, SphereSpinner } from 'react-spinners-kit';
import { CopiedIcon } from '../Icons/Copied';
import * as styles from './TxDialog.css';
import type { Transaction } from '../../transactions/transactionStore';
import { TxCloseButton } from '../CloseButton/TxCloseButton';
import { useAccount, useNetwork } from 'wagmi';
import TxStatusImage from './TxStatusImage';
import { StatusBox, BoxInfo } from './StatusBox.css';
import { touchableStyles } from '../../css/touchableStyles';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { AsyncImage } from '../AsyncImage/AsyncImage';

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
      height="40"
      style={{
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        width="full"
        paddingRight="10"
        overflow="hidden"
        style={{
          background: `linear-gradient(52deg, ${chainIconBackground} 20 0%,  ${chainIconBackground} 40 100%)`,
        }}
      >
        <TxCloseButton onClose={onClose} />
      </Box>
      {!mobile && activeChain ? (
        rocketUrl && (
          <Box
            className={[pendingTx ? styles.onEnter : styles.onExit]}
            style={{
              width: '75px',
              height: '123px',
              marginTop: '60px',
            }}
          >
            <AsyncImage
              alt={activeChain.name}
              borderRadius="full"
              height="full"
              src={rocketUrl}
              width="full"
            />
            <Box
              style={{
                position: 'relative',
                top: '-3px',
                right: '-1px',
                transform: ' scale(.6) rotate(90deg) ',
              }}
            >
              <PushSpinner color="white" />
            </Box>
          </Box>
        )
      ) : (
        <Box style={{ marginBottom: '3px' }}>
          {pendingTx && <SphereSpinner size={18} />}
        </Box>
      )}
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
    </Box>
  );
}

export interface TransactionModalProps {
  txModalOpen: boolean;
  closeTxModal: () => void;
  trackedTx: Transaction | null;
  address: ReturnType<typeof useAccount>['address'];
  activeChain: ReturnType<typeof useNetwork>['chain'];
  iconBackground?: string;
  rocketUrl?: string;
}

const TransactionModal = ({
  txModalOpen,
  closeTxModal,
  trackedTx,
  address,
  activeChain,
  iconBackground,
  rocketUrl,
}: TransactionModalProps) => {
  const mobile = isMobile();
  const titleId = 'rk_account_modal_title';

  return (
    <>
      <Dialog onClose={closeTxModal} open={txModalOpen} titleId={titleId}>
        <TxDialogContent
          bottomSheetOnMobile
          padding="0"
          chainIconBackground={iconBackground}
        >
          {trackedTx?.status && (
            <TxItem
              transactionStatus={trackedTx.status}
              mobile={mobile}
              onClose={closeTxModal}
              chainIconBackground={iconBackground}
              address={address}
              activeChain={activeChain}
              rocketUrl={rocketUrl}
            />
          )}
        </TxDialogContent>
      </Dialog>
    </>
  );
};
export default TransactionModal;
