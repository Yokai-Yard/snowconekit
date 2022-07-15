import React, { useEffect } from 'react';
import { useNetwork, useAccount } from 'wagmi';
import { increaseHitAreaForHoverTransform } from '../../css/increaseHitAreaForHoverTransform.css';
import { Transaction } from '../../transactions/transactionStore';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CancelIcon } from '../Icons/Cancel';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { SpinnerIcon } from '../Icons/Spinner';
import { SuccessIcon } from '../Icons/Success';
import { Text } from '../Text/Text';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { useRainbowKitChainsById } from '../RainbowKitProvider/RainbowKitChainContext';
import { timeAgo } from '../../utils/timeAgo';
import { formatTransactionAddress } from '../ConnectButton/formatModalAddresses';

const getTxStatusIcon = (status: Transaction['status']) => {
  switch (status) {
    case 'pending':
      return SpinnerIcon;
    case 'confirmed':
      return SuccessIcon;
    case 'failed':
      return CancelIcon;
    default:
      return SpinnerIcon;
  }
};

interface ModalTxProps {
  address: ReturnType<typeof useAccount>['address'];
  tx: Transaction;
}

export function ModalTxItem({ tx, address }: ModalTxProps) {
  const mobile = isMobile();
  const color = tx.status === 'failed' ? 'error' : 'accentColor';
  const { chain } = useNetwork();
  const explorerLink = chainToExplorerUrl(chain);
  const rainbowkitChainsById = useRainbowKitChainsById();
  const rainbowKitChain = chain ? rainbowkitChainsById[chain.id] : undefined;
  const chainIconUrl = rainbowKitChain?.iconUrl ?? undefined;
  const confirmationStatus =
    tx.status === 'confirmed'
      ? 'Confirmed'
      : tx.status === 'failed'
      ? 'Failed'
      : 'Pending';

  const transactionAddress = address && formatTransactionAddress(address);

  const styles = {
    position: 'relative',
    width: 46,
    height: 38,
    borderRadius: '50%',
    border: '4px solid white',
    boxShadow: '3px 3px 4px  rgba(0, 0, 0, 0.3)',
    bottom: '9%',
    filter: 'drop-shadow(1.79px 1.79px 3.58px rgba(0, 0, 0, 0.33))',
  };

  return (
    <>
      <Box
        {...(explorerLink
          ? {
              as: 'a',
              borderRadius: 'menuButton',
              className: increaseHitAreaForHoverTransform.grow,
              href: `${explorerLink}/tx/${tx.hash}`,
              rel: 'noreferrer',
              target: '_blank',
            }
          : {})}
        display="flex"
      >
        <Box
          {...(explorerLink
            ? {
                background: { hover: 'profileForeground' },
                borderRadius: 'menuButton',
                transform: { active: 'shrink' },
                transition: 'default',
              }
            : {})}
          color="modalText"
          display="flex"
          flexDirection="row"
          padding="8"
          width="full"
          gap={mobile ? '16' : '14'}
          alignItems="center"
        >
          <Box style={styles}>
            <AsyncImage
              borderRadius="full"
              height="full"
              src={chainIconUrl}
              width="full"
            />
            <Box
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                borderRadius: '20%',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
              }}
            ></Box>
          </Box>

          <Box
            className="annoyingrow"
            width="full"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="column" gap={mobile ? '3' : '1'}>
              <Box>
                <Text
                  display="flex"
                  color="modalText"
                  font="body"
                  size={mobile ? '16' : '14'}
                  weight="bold"
                >
                  {transactionAddress}
                </Text>
              </Box>

              <Box>
                <Text
                  color={tx.status === 'pending' ? 'modalTextSecondary' : color}
                  font="body"
                  size="14"
                  weight={mobile ? 'medium' : 'regular'}
                >
                  {confirmationStatus}
                </Text>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              gap={mobile ? '3' : '1'}
              height="full"
            >
              <Box
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'right',
                  opacity: 0.65,
                }}
              >
                <Text
                  color="modalText"
                  font="body"
                  size={mobile ? '16' : '14'}
                  weight="regular"
                >
                  {timeAgo(tx.timeStamp)}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* {explorerLink && (
            <Box alignItems="center" color="modalTextDim" display="flex">
              <ExternalLinkIcon />
            </Box>
          )} */}
        </Box>
      </Box>
    </>
  );
}
