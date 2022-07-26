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
import {
  GlassCard,
  GlassNav,
  GlassAvatar,
  NetworkSwitchAlert,
  ConnectedToAvatar,
} from './ProfileDetails.css';
import { isMobile } from '../../utils/isMobile';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { formatModalAddress } from '../ConnectButton/formatModalAddresses';
import { formatENS } from '../ConnectButton/formatENS';
import { CopiedIcon } from '../Icons/Copied';
import { CopyIcon } from '../Icons/Copy';
import { DisconnectIcon } from '../Icons/Disconnect';
import { ShowRecentTransactionsContext } from '../SnowConeKitProvider/ShowRecentTransactionsContext';
import { Text } from '../Text/Text';
import { emojiAvatarForAddress } from '../Avatar/emojiAvatarForAddress';
import { LayeredBg } from '../Icons/LayeredBg';
import { NavButton } from './NavButton';
import { ModalTxList } from '../TransactionModal/ModalTxList';
import { NetworkCarousel } from '../NetworkCarousel/NetworkCarousel';
import { ChainIcon } from '../Icons/ChainIcon';
import DangerIcon from '../Icons/danger.png';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { useSnowConeKitChainsById } from '../SnowConeKitProvider/SnowConeKitChainContext';
import { ThemeContext } from '../SnowConeKitProvider/SnowConeKitProvider';
import { useChainModal } from '../SnowConeKitProvider/ModalContext';

interface ProfileDetailsProps {
  address: ReturnType<typeof useAccount>['address'];
  balanceData: ReturnType<typeof useBalance>['data'];
  ensAvatar: ReturnType<typeof useEnsAvatar>['data'];
  ensName: ReturnType<typeof useEnsName>['data'];
  onClose: () => void;
  onDisconnect: () => void;
}

/*   activeChain: ReturnType<typeof useNetwork>['chain'];
  chains: ReturnType<typeof useNetwork>['chains'];
  networkError: ReturnType<typeof useSwitchNetwork>['error'];
  onSwitchNetwork?: (chainId: number) => unknown;
  openChainModal: () => void; */

/*   activeChain,
chains,
networkError,
onSwitchNetwork,
openChainModal, */

export function ProfileDetails({
  address,
  balanceData,
  ensAvatar,
  ensName,
  onClose,
  onDisconnect,
}: ProfileDetailsProps) {
  const { chain: activeChain } = useNetwork();
  const { chains, error: networkError, switchNetwork } = useSwitchNetwork();
  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { openChainModal } = useChainModal();

  const { color: backgroundColor } = useMemo(
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

  const snowconekitChainsById = useSnowConeKitChainsById();

  const currentChain = activeChain && snowconekitChainsById[activeChain?.id];
  const chainIconUrl = currentChain?.iconUrl;

  const accountName = ensName
    ? formatENS(ensName)
    : formatModalAddress(address);
  const ethBalance = balanceData?.formatted;
  const balance = Number(ethBalance).toPrecision(3);
  const titleId = 'rk_profile_title';
  const mobile = isMobile();
  const theme = useContext(ThemeContext);

  const isLightMode = theme?.colors?.modalBackground === '#FFFFFF';

  return (
    <>
      <Box display="flex" flexDirection="column">
        <LayeredBg profColor={backgroundColor}>
          <Box className={GlassNav}>
            {mobile && switchNetwork ? (
              <NavButton
                action={openChainModal}
                icon={<ChainIcon />}
                label={'Change Network'}
              />
            ) : null}
            <Box style={{ flexGrow: 1 }} />
            <NavButton
              action={onDisconnect}
              icon={<DisconnectIcon />}
              label="Disconnect"
            />
            <CloseButton onClose={onClose} background={true} />
          </Box>
          <Box background="profileForeground" padding="16">
            <Box
              className={GlassCard}
              style={{
                border: isLightMode
                  ? '1px solid rgba( 255, 255, 255, .68 )'
                  : '1px solid rgba( 0, 0, 0, 0.68 )',
                background: isLightMode
                  ? 'linear-gradient(112deg, rgba(255, 255, 255,0.2) 0%, rgba(255, 255, 255,0.0) 100%)'
                  : 'linear-gradient(112deg, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0,0.0) 100%)',
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
                <Box className={GlassAvatar}>
                  <Avatar address={address} imageUrl={ensAvatar} size={60} />
                </Box>
                <Box>
                  <Box marginTop={'44'} textAlign="left">
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
                      gap="12"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      marginTop="20"
                      textAlign="left"
                      style={{
                        opacity: '.65',
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
                      <Box style={{ color: 'accentColorForeground' }}>
                        <NavButton
                          action={copyAddressAction}
                          icon={copiedAddress ? <CopiedIcon /> : <CopyIcon />}
                          label={copiedAddress ? 'Copied!' : 'Copy Address'}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            {chains.length === 1 ? (
              <Box
                display="flex"
                marginTop="14"
                paddingY="14"
                paddingLeft="10"
                className={GlassCard}
                style={{
                  border: isLightMode
                    ? '1px solid rgba( 255, 255, 255, 0.68 )'
                    : '1px solid rgba( 0, 0, 0, 0.68 )',
                  background: isLightMode
                    ? 'linear-gradient(112deg, rgba(255, 255, 255,0.2) 0%, rgba(255, 255, 255,0.0) 100%)'
                    : 'linear-gradient(112deg, rgba(0, 0, 0,0.2) 0%, rgba(0, 0, 0,0.0) 100%)',
                }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  gap="14"
                  alignItems="center"
                >
                  {chainIconUrl && (
                    <Box className={ConnectedToAvatar}>
                      <AsyncImage
                        alt={activeChain?.name}
                        borderRadius="full"
                        height="full"
                        src={chainIconUrl}
                        width="full"
                      />
                    </Box>
                  )}
                  <Text color="accentColorForeground">
                    Connected to {activeChain?.name}
                  </Text>
                </Box>
              </Box>
            ) : switchNetwork ? (
              !mobile ? (
                <NetworkCarousel
                  activeChain={activeChain}
                  chains={chains}
                  networkError={networkError}
                  onSwitchNetwork={switchNetwork}
                />
              ) : null
            ) : (
              <Box className={NetworkSwitchAlert}>
                <Box paddingRight="12" paddingTop="-1">
                  <img src={DangerIcon} alt="danger" />
                </Box>
                <Box style={{ color: 'rgb(102, 60, 0)' }}>
                  <Text size="14" weight="regular" color={undefined}>
                    Your wallet does not support switching networks from
                    SnowconeKit. Try switching networks from within your wallet
                    instead.
                  </Text>
                </Box>
              </Box>
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
