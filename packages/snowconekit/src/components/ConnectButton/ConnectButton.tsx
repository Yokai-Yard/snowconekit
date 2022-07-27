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
import { ConnectButtonRenderer } from './ConnectButtonRenderer';
import type { Transaction } from '../../transactions/transactionStore';
import { Text } from '../Text/Text';
import { SphereSpinner, ImpulseSpinner } from 'react-spinners-kit';
import CheckIcon from '../Icons/check.svg';

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
  return (
    <ConnectButtonRenderer>
      {({
        account,
        chain,
        mounted,
        pendingTransactions,
        trackedTx,
        openAccountModal,
        openChainModal,
        openConnectModal,
        setTx,
      }) => {
        const unsupportedChain = chain?.unsupported ?? false;

        console.log(trackedTx);

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
                          {trackedTx?.status === 'pending' ? (
                            <Box style={{ width: 24, paddingLeft: '4px' }}>
                              <SphereSpinner color="black" size={17} />
                            </Box>
                          ) : trackedTx?.status === 'confirmed' ? (
                            <img
                              src={CheckIcon}
                              alt="Check mark"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Avatar
                              address={account.address}
                              imageUrl={account.ensAvatar}
                              loading={account.displayRecentTransactions}
                              size={24}
                            />
                          )}
                        </Box>

                        <Box alignItems="center" display="flex" gap="6">
                          <Box
                            display={mapResponsiveValue(accountStatus, value =>
                              value === 'full' || value === 'address'
                                ? 'block'
                                : 'none'
                            )}
                          >
                            {trackedTx?.status === 'pending' ? (
                              <Box
                                display="flex"
                                position="relative"
                                style={{ width: '96px', paddingLeft: '2px' }}
                              >
                                Pending
                                <Box paddingTop="12" paddingLeft="1">
                                  <ImpulseSpinner
                                    size={11}
                                    frontColor={'#14516d'}
                                  />
                                </Box>
                              </Box>
                            ) : trackedTx?.status === 'confirmed' ? (
                              <Box
                                display="flex"
                                position="relative"
                                style={{
                                  width: '96px',
                                  paddingLeft: '2px',
                                  alignSelf: 'center',
                                }}
                              >
                                Confirmed
                              </Box>
                            ) : (
                              <Box style={{ width: '96px', display: 'flex' }}>
                                {account.displayName}
                              </Box>
                            )}
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
