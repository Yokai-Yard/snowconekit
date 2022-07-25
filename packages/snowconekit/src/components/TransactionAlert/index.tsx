import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { Dialog } from '../Dialog/Dialog';
import { TxDialogContent } from '../TransactionModal/TxDialogContent';
import type { Transaction } from '../../transactions/transactionStore';
import { useAccount, useNetwork } from 'wagmi';
import { TxItem } from '../TransactionModal/TxItem';

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
