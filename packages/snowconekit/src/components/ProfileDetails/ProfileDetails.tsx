import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useAccount, useBalance, useEnsAvatar, useEnsName } from 'wagmi';
import { GlassCard, GlassNav } from './ProfileDetails.css';
import { isMobile } from '../../utils/isMobile';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { formatModalAddress } from '../ConnectButton/formatModalAddress';
import { formatENS } from '../ConnectButton/formatENS';
import { CopiedIcon } from '../Icons/Copied';
import { CopyIcon } from '../Icons/Copy';
import { DisconnectIcon } from '../Icons/Disconnect';
import { ShowRecentTransactionsContext } from '../RainbowKitProvider/ShowRecentTransactionsContext';
import { Text } from '../Text/Text';
import { TxList } from '../Txs/TxList';
import { ProfileCreditCard } from './ProfileCreditCard';
import { ProfileDetailsAction } from './ProfileDetailsAction';
import { LayeredBg } from '../Icons/LayeredBg';

interface ProfileDetailsProps {
  accountData: ReturnType<typeof useAccount>['data'];
  balanceData: ReturnType<typeof useBalance>['data'];
  ensAvatar: ReturnType<typeof useEnsAvatar>['data'];
  ensName: ReturnType<typeof useEnsName>['data'];
  onClose: () => void;
  onDisconnect: () => void;
}

export function ProfileDetails({
  accountData,
  balanceData,
  ensAvatar,
  ensName,
  onClose,
  onDisconnect,
}: ProfileDetailsProps) {
  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyAddressAction = useCallback(() => {
    if (accountData?.address) {
      navigator.clipboard.writeText(accountData?.address);
      setCopiedAddress(true);
    }
  }, [accountData?.address]);

  useEffect(() => {
    if (copiedAddress) {
      const timer = setTimeout(() => {
        setCopiedAddress(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedAddress]);

  if (!accountData?.address) {
    return null;
  }

  const accountName = ensName
    ? formatENS(ensName)
    : formatModalAddress(accountData.address);
  const ethBalance = balanceData?.formatted;
  const balance = Number(ethBalance).toPrecision(3);
  const titleId = 'rk_profile_title';
  const mobile = isMobile();

  return (
    <>
      <Box display="flex" flexDirection="column">
        <LayeredBg>
          <Box className={GlassNav}>
            <CloseButton onClose={onClose} />
          </Box>
          <Box background="profileForeground" padding="16">
            <Box
              className={GlassCard}
              style={{
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow:
                  '0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%), 0px 3px 14px 2px rgb(145 158 171 / 12%)',
                marginTop: '13px',
              }}
            >
              <Box
                display="flex"
                margin="10"
                flexDirection="column"
                justifyContent="space-between"
                style={{
                  height: '187px',
                }}
              >
                <Box
                  marginTop={mobile ? '24' : '0'}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backdropFilter: 'blur(4px)',
                    backgroundColor: '#ffffff',
                    inset: 0,
                    position: 'relative',
                    zIndex: 11,
                  }}
                >
                  <Avatar
                    address={accountData.address}
                    imageUrl={ensAvatar}
                    size={60}
                  />
                </Box>

                <Box paddingBottom="20" style={{}}>
                  <Box
                    textAlign="left"
                    style={{
                      textShadow:
                        '0px 1px 1px rgba(0,0,0, .15), 0px -1px 1.5px rgba(255,255,255, .5)',
                    }}
                  >
                    <Text
                      as="h1"
                      color="accentColorForeground"
                      id={titleId}
                      size={mobile ? '20' : '18'}
                      weight="regular"
                    >
                      {accountName}
                    </Text>
                  </Box>
                  {balanceData && (
                    <Box
                      textAlign="left"
                      style={{
                        opacity: '.65',
                        textShadow:
                          '0px 1px 1px rgba(255,255,255, .15), 0px -1px 1.5px rgba(100,100,100, .5)',
                      }}
                    >
                      <Text
                        as="h1"
                        color="modalText"
                        id={titleId}
                        size={mobile ? '16' : '14'}
                        weight="semibold"
                      >
                        {balance} {balanceData.symbol}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap="8"
              margin="2"
              marginTop="16"
            >
              <ProfileDetailsAction
                action={copyAddressAction}
                icon={copiedAddress ? <CopiedIcon /> : <CopyIcon />}
                label={copiedAddress ? 'Copied!' : 'Copy Address'}
              />
              <ProfileDetailsAction
                action={onDisconnect}
                icon={<DisconnectIcon />}
                label="Disconnect"
              />
            </Box>
          </Box>
          {showRecentTransactions && (
            <>
              <Box background="generalBorder" height="1" marginTop="-1" />
              <Box>
                <TxList accountData={accountData} />
              </Box>
            </>
          )}
        </LayeredBg>
      </Box>
    </>
  );
}
