import React, { useEffect, useContext } from 'react';
import {
  mapResponsiveValue,
  normalizeResponsiveValue,
  ResponsiveValue,
} from '../../css/sprinkles.css';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { useSnowConeKitChains } from '../SnowConeKitProvider/SnowConeKitChainContext';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';
import { SphereSpinner, ImpulseSpinner } from 'react-spinners-kit';
import CheckIcon from '../Icons/check.svg';
import ExclamationIcon from '../Icons/exclamationMark.svg';
import type { Transaction } from '../../transactions/transactionStore';
import { useTrackedTx } from '../SnowConeKitProvider/ModalContext';

type AccountStatus = 'full' | 'avatar' | 'address';
type ChainStatus = 'full' | 'icon' | 'name' | 'none';

export interface ConnectButtonProps {
  accountStatus?: ResponsiveValue<AccountStatus>;
  showBalance?: ResponsiveValue<boolean>;
  chainStatus?: ResponsiveValue<ChainStatus>;
  label?: string;
  trackedTx?: Transaction | null;
}

const defaultProps = {
  accountStatus: 'full',
  chainStatus: { largeScreen: 'full', smallScreen: 'icon' },
  label: 'Connect Wallet',
  showBalance: { largeScreen: true, smallScreen: false },
  trackedTx: null,
} as const;

export function ConnectButton({
  accountStatus = defaultProps.accountStatus,
  chainStatus = defaultProps.chainStatus,
  label = defaultProps.label,
  showBalance = defaultProps.showBalance,
}: ConnectButtonProps) {
  const chains = useSnowConeKitChains();

  const { trackedTx } = useTrackedTx();

  console.log('trackedTx', trackedTx);

  return (
    <ConnectButtonRenderer>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
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
                {chain && (chains.length > 1 || unsupportedChain) && (
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
                    {unsupportedChain ? (
                      <Box
                        alignItems="center"
                        display="flex"
                        height="24"
                        paddingX="4"
                      >
                        Wrong network
                      </Box>
                    ) : (
                      <Box alignItems="center" display="flex" gap="6">
                        {chain.hasIcon ? (
                          <Box
                            display={mapResponsiveValue(chainStatus, value =>
                              value === 'full' || value === 'icon'
                                ? 'block'
                                : 'none'
                            )}
                            height="24"
                            width="24"
                          >
                            <AsyncImage
                              alt={chain.name ?? 'Chain icon'}
                              background={chain.iconBackground}
                              borderRadius="full"
                              height="24"
                              src={chain.iconUrl}
                              width="24"
                            />
                          </Box>
                        ) : null}
                        <Box
                          display={mapResponsiveValue(chainStatus, value => {
                            if (value === 'icon' && !chain.iconUrl) {
                              return 'block'; // Show the chain name if there is no iconUrl
                            }

                            return value === 'full' || value === 'name'
                              ? 'block'
                              : 'none';
                          })}
                        >
                          {chain.name ?? chain.id}
                        </Box>
                      </Box>
                    )}
                    <DropdownIcon />
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
                          ) : trackedTx?.status === 'failed' ? (
                            <img
                              src={ExclamationIcon}
                              alt="Exclamation mark"
                              width="24px"
                              height="24px"
                            />
                          ) : (
                            <Avatar
                              address={account.address}
                              imageUrl={account.ensAvatar}
                              loading={account.hasPendingTransactions}
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
                                style={{ width: '100px', paddingLeft: '2px' }}
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
                            ) : trackedTx?.status === 'failed' ? (
                              <Box
                                display="flex"
                                position="relative"
                                style={{
                                  width: '96px',
                                  paddingLeft: '2px',
                                  alignSelf: 'center',
                                }}
                              >
                                Failed
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
