import React, { useContext } from 'react';

import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { DisclaimerLink } from '../Disclaimer/DisclaimerLink';
import { DisclaimerText } from '../Disclaimer/DisclaimerText';
import { LoginIcon } from '../Icons/Login';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { Text } from '../Text/Text';
import { connectCards } from './ConnectModal.css';

export function ConnectModalIntro({ getWallet }: { getWallet: () => void }) {
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext(AppContext);

  return (
    <>
      <Box
        alignItems="flex-end"
        color="accentColor"
        display="flex"
        flexDirection="column"
        height="full"
        justifyContent="flex-start"
      >
        {/* <Box marginBottom="0" style={{ backgroundColor: '#FFF', padding: '4px 32px', borderRadius: '8px' }}>
          <Text color="modalText" size="20" weight="heavy">
            What is a Wallet?
          </Text>
        </Box> */}
        <Box
          display="flex"
          flexDirection="column"
          gap="12"
          justifyContent="center"
          marginY="0"
          style={{ maxWidth: 312 }}
        >
          {/* <Box alignItems="center" display="flex" flexDirection="row" gap="16" >
            <Box borderRadius="6" height="48" minWidth="48" width="48">
              <AssetsIcon />
            </Box>
            <Box display="flex" flexDirection="column" gap="4" className={connectCards}>
              <Text color="modalText" size="14" weight="bold">
                A Home for your Digital Assets
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                Wallets are used to send, receive, store, and display digital
                assets like Ethereum and NFTs.
              </Text>
            </Box>
          </Box> */}
          <Box alignItems="center" display="flex" flexDirection="row" gap="16">
            <Box borderRadius="6" height="48" minWidth="48" width="48">
              <LoginIcon />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="4"
              className={connectCards}
            >
              <Text color="modalText" size="14" weight="bold">
                A New Way to Log In
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                Instead of creating new accounts and passwords on every website,
                just connect your wallet.
              </Text>
              <Box
                alignItems="flex-end"
                display="flex"
                flexDirection="row"
                gap="4"
                justifyContent="flex-start"
                paddingTop="8"
                fontSize="8"
                fontWeight="medium"
              >
                <ActionButton
                  type={'primary'}
                  label="Get a Wallet"
                  onClick={getWallet}
                />
                {/* <Box
                  as="a"
                  className={increaseHitAreaForHoverTransform.grow}
                  display="block"
                  href={learnMoreUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Box
                    paddingX="12"
                    paddingY="4"
                    style={{ willChange: 'transform' }}
                    transform={{ active: 'shrink', hover: 'grow' }}
                    transition="default"
                  >
                    <Text color="accentColor" size="14" weight="bold">
                      Learn More
                    </Text>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>

        {Disclaimer && (
          <Box marginBottom="8" marginTop="12" textAlign="center">
            <Disclaimer Link={DisclaimerLink} Text={DisclaimerText} />
          </Box>
        )}
      </Box>
    </>
  );
}
