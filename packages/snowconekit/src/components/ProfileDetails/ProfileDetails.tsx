import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  useAccount,
  useNetwork,
  useSwitchNetwork,
  useBalance,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { GlassCard, GlassNav, GlassAvatar } from './ProfileDetails.css';
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
import { emojiAvatarForAddress } from '../Avatar/emojiAvatarForAddress';

import { LayeredBg } from '../Icons/LayeredBg';
import { NavButton } from './NavButton';
import { ModalTxList } from '../Txs/ModalTxList';
import { NetworkCarousel } from '../NetworkCarousel/NetworkCarousel';
import { ChainIcon } from '../Icons/ChainIcon';

interface ProfileDetailsProps {
  address: ReturnType<typeof useAccount>['address'];
  balanceData: ReturnType<typeof useBalance>['data'];
  ensAvatar: ReturnType<typeof useEnsAvatar>['data'];
  ensName: ReturnType<typeof useEnsName>['data'];
  onClose: () => void;
  onDisconnect: () => void;
  activeChain: ReturnType<typeof useNetwork>['chain'];
  chains: ReturnType<typeof useNetwork>['chains'];
  networkError: ReturnType<typeof useSwitchNetwork>['error'];
  onSwitchNetwork?: (chainId: number) => unknown;
  openChainModal: () => void;
}

export function ProfileDetails({
  address,
  balanceData,
  ensAvatar,
  ensName,
  onClose,
  onDisconnect,
  activeChain,
  chains,
  networkError,
  onSwitchNetwork,
  openChainModal,
}: ProfileDetailsProps) {
  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address ? address : ''),
    [address]
  );

  const copyAddressAction = useCallback(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(true);
    }
  }, [address]);

  useEffect(() => {
    if (copiedAddress) {
      const timer = setTimeout(() => {
        setCopiedAddress(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedAddress]);

  if (!address) {
    return null;
  }

  const accountName = ensName
    ? formatENS(ensName)
    : formatModalAddress(address);
  const ethBalance = balanceData?.formatted;
  const balance = Number(ethBalance).toPrecision(3);
  const titleId = 'rk_profile_title';
  const mobile = isMobile();

  return (
    <>
      <Box display="flex" flexDirection="column">
        <LayeredBg profColor={backgroundColor}>
          <Box
            className={GlassNav}
            style={{
              background: `linear-gradient(52deg, ${backgroundColor}20 0%, ${backgroundColor}40 100%)`,
            }}
          >
            {mobile && (
              <NavButton
                action={openChainModal}
                icon={<ChainIcon />}
                label={'Change Network'}
              />
            )}
            <Box style={{ flexGrow: 1 }} />
            <NavButton
              action={copyAddressAction}
              icon={copiedAddress ? <CopiedIcon /> : <CopyIcon />}
              label={copiedAddress ? 'Copied!' : 'Copy Address'}
            />
            <NavButton
              action={onDisconnect}
              icon={<DisconnectIcon />}
              label="Disconnect"
            />
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
                style={{
                  height: '187px',
                }}
              >
                <Box marginTop={mobile ? '24' : '0'} className={GlassAvatar}>
                  <Avatar address={address} imageUrl={ensAvatar} size={60} />
                </Box>

                <Box paddingBottom="0">
                  <Box
                    marginTop={'44'}
                    textAlign="left"
                    /* style={{
                      textShadow:
                        '0px 1px 1px rgba(0,0,0, .15), 0px -1px 1.5px rgba(255,255,255, .5)',
                    }} */
                  >
                    <Text
                      as="h1"
                      className="accountText"
                      color="accentColorForeground"
                      size={mobile ? '20' : '23'}
                      weight="regular"
                    >
                      {accountName}
                    </Text>
                  </Box>
                  {balanceData && (
                    <Box
                      marginTop={'20'}
                      textAlign="left"
                      style={{
                        opacity: '.65',
                        /*  textShadow:
                          '0px 1px 1px rgba(255,255,255, .15), 0px -1px 1.5px rgba(100,100,100, .5)', */
                      }}
                    >
                      <Text
                        as="h1"
                        color="accentColorForeground"
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
            {!mobile && (
              <NetworkCarousel
                activeChain={activeChain}
                chains={chains}
                networkError={networkError}
                onSwitchNetwork={onSwitchNetwork}
              />
            )}
          </Box>
          {showRecentTransactions && (
            <>
              <Box background="generalBorder" height="1" marginTop="-1" />
              <Box>
                <ModalTxList address={address} chains={chains} />
              </Box>
            </>
          )}
        </LayeredBg>
      </Box>
    </>
  );
}
