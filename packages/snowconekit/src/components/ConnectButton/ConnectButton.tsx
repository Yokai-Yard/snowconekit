import React from 'react';
import {
  mapResponsiveValue,
  normalizeResponsiveValue,
  ResponsiveValue,
} from '../../css/sprinkles.css';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { useRainbowKitChains } from '../RainbowKitProvider/RainbowKitChainContext';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';

type AccountStatus = 'full' | 'avatar' | 'address';
type ChainStatus = 'full' | 'icon' | 'name' | 'none';

export interface ConnectButtonProps {
  accountStatus?: ResponsiveValue<AccountStatus>;
  showBalance?: ResponsiveValue<boolean>;
  chainStatus?: ResponsiveValue<ChainStatus>;
  label?: string;
}

const defaultProps = {
  accountStatus: 'full',
  chainStatus: { largeScreen: 'full', smallScreen: 'icon' },
  label: 'Connect Wallet',
  showBalance: { largeScreen: true, smallScreen: false },
} as const;

export function ConnectButton({
  accountStatus = defaultProps.accountStatus,
  chainStatus = defaultProps.chainStatus,
  label = defaultProps.label,
  showBalance = defaultProps.showBalance,
}: ConnectButtonProps) {
  const chains = useRainbowKitChains();

  return (
    <ConnectButtonRenderer>
      {({
        account,
        chain,
        mounted,
        pendingTransactions,
        openAccountModal,
        openChainModal,
        openConnectModal,
        setTx,
      }) => {
        const unsupportedChain = chain?.unsupported ?? false;

        return (
          <Box
            display="flex"
            gap="12"
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {mounted && account ? (
              <>
                {pendingTransactions && setTx(pendingTransactions)}
                {chain && unsupportedChain && (
                  <Box
                    alignItems="center"
                    as="button"
                    background={
                      unsupportedChain
                        ? 'connectButtonBackgroundError'
                        : 'connectButtonBackground'
                    }
                    borderRadius="connectButton"
                    boxShadow="connectButton"
                    className={touchableStyles({
                      active: 'shrink',
                      hover: 'grow',
                    })}
                    color={
                      unsupportedChain
                        ? 'connectButtonTextError'
                        : 'connectButtonText'
                    }
                    display={mapResponsiveValue(chainStatus, value =>
                      value === 'none' ? 'none' : 'flex'
                    )}
                    fontFamily="body"
                    fontWeight="bold"
                    gap="6"
                    key={
                      // Force re-mount to prevent CSS transition
                      unsupportedChain ? 'unsupported' : 'supported'
                    }
                    onClick={openChainModal}
                    paddingX="10"
                    paddingY="8"
                    transition="default"
                    type="button"
                  >
                    {unsupportedChain && (
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Box paddingX="10">Wrong network</Box>
                        <DropdownIcon />
                      </Box>
                    )}
                  </Box>
                )}

                {!unsupportedChain && (
                  <Box
                    alignItems="center"
                    as="button"
                    background="connectButtonBackground"
                    borderRadius="connectButton"
                    boxShadow="connectButton"
                    className={touchableStyles({
                      active: 'shrink',
                      hover: 'grow',
                    })}
                    color="connectButtonText"
                    display="flex"
                    fontFamily="body"
                    fontWeight="bold"
                    onClick={openAccountModal}
                    transition="default"
                    type="button"
                  >
                    {account.displayBalance && (
                      <Box
                        display={mapResponsiveValue(showBalance, value =>
                          value ? 'block' : 'none'
                        )}
                        padding="8"
                        paddingLeft="12"
                      >
                        {account.displayBalance}
                      </Box>
                    )}
                    <Box
                      background={
                        normalizeResponsiveValue(showBalance)[
                          isMobile() ? 'smallScreen' : 'largeScreen'
                        ]
                          ? 'connectButtonInnerBackground'
                          : 'connectButtonBackground'
                      }
                      borderColor="connectButtonBackground"
                      borderRadius="connectButton"
                      borderStyle="solid"
                      borderWidth="2"
                      color="connectButtonText"
                      fontFamily="body"
                      fontWeight="bold"
                      paddingX="8"
                      paddingY="6"
                      transition="default"
                    >
                      <Box
                        alignItems="center"
                        display="flex"
                        gap="6"
                        height="24"
                      >
                        <Box
                          display={mapResponsiveValue(accountStatus, value =>
                            value === 'full' || value === 'avatar'
                              ? 'block'
                              : 'none'
                          )}
                        >
                          <Avatar
                            address={account.address}
                            imageUrl={account.ensAvatar}
                            loading={account.displayRecentTransactions}
                            size={24}
                          />
                        </Box>

                        <Box alignItems="center" display="flex" gap="6">
                          <Box
                            display={mapResponsiveValue(accountStatus, value =>
                              value === 'full' || value === 'address'
                                ? 'block'
                                : 'none'
                            )}
                          >
                            {account.displayName}
                          </Box>
                          <DropdownIcon />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <Box
                as="button"
                background="accentColor"
                borderRadius="connectButton"
                boxShadow="connectButton"
                className={touchableStyles({ active: 'shrink', hover: 'grow' })}
                color="accentColorForeground"
                fontFamily="body"
                fontWeight="bold"
                height="40"
                key="connect"
                onClick={openConnectModal}
                paddingX="14"
                transition="default"
                type="button"
              >
                {label}
              </Box>
            )}
          </Box>
        );
      }}
    </ConnectButtonRenderer>
  );
}

ConnectButton.__defaultProps = defaultProps;
ConnectButton.Custom = ConnectButtonRenderer;
