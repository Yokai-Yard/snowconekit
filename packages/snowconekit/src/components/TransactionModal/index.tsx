import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { Dialog } from '../Dialog/Dialog';
import { TxDialogContent } from './TxDialogContent';
import type { Transaction } from '../../transactions/transactionStore';
import { useAccount, useNetwork } from 'wagmi';
import { TxItem } from './TxItem';
import {
  useSnowConeKitChains,
  useSnowConeKitChainsById,
} from '../SnowConeKitProvider/SnowConeKitChainContext';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';

export interface TransactionModalProps {
  txModalOpen: boolean;
  closeTxModal: () => void;
  trackedTx: Transaction | null;
}

const TransactionModal = ({
  txModalOpen,
  closeTxModal,
  trackedTx,
}: TransactionModalProps) => {
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const mobile = isMobile();
  const titleId = 'rk_account_modal_title';

  const snowconekitChainsById = useSnowConeKitChainsById();
  const snowconekitChain = activeChain
    ? snowconekitChainsById[activeChain.id]
    : undefined;

  const iconBackground = snowconekitChain?.iconBackground;
  const chainRocketUrl = snowconekitChain?.rocketUrl ?? undefined;

  const rocketUrl = useAsyncImage(chainRocketUrl);

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
