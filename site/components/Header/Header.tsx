import {
  ConnectButton,
  darkTheme,
  lightTheme,
  SnowConeKitProvider,
} from '@sirbenchalot/snowconekit';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import pckg from '../../../packages/snowconekit/package.json';
import { vars } from '../../css/vars.css';
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { chains } from '../Provider/Provider';
import { Text } from '../Text/Text';
import { header, row } from './Header.css';

const SNOWCONEKIT_VERSION = pckg.version;

export function Header({
  darkMode,
  docsMobileMenuRef,
  sticky,
  ...props
}: {
  darkMode?: boolean;
  docsMobileMenuRef?: React.RefObject<HTMLDivElement>;
  sticky?: boolean;
}) {
  return (
    <Box className={sticky ? header : undefined} {...props}>
      <Box className={row}>
        <NextLink href="/">
          <NextImage
            alt="SnowConeKit Logo"
            height="40"
            src="/NeonIcon.png"
            style={{ cursor: 'pointer' }}
            width="40"
          />
        </NextLink>

        <Box
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          display="flex"
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          flexDirection={{ xs: 'column', sm: 'row' }}
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          gap={{ xs: '1', sm: '4' }}
        >
          <Text
            style={{ lineHeight: 1, marginLeft: '8px' }}
            variant="title3"
            weight="bold"
          >
            SnowConeKit
          </Text>
          <Badge>{SNOWCONEKIT_VERSION}</Badge>
        </Box>

        <Box style={{ marginLeft: 'auto' }}>
          <SnowConeKitProvider
            chains={chains}
            theme={
              darkMode
                ? darkTheme({ accentColor: vars.colors.blue })
                : lightTheme({ accentColor: vars.colors.blue })
            }
          >
            <ConnectButton
              accountStatus={{ largeScreen: 'full', smallScreen: 'avatar' }}
            />
          </SnowConeKitProvider>{' '}
        </Box>
      </Box>
      {docsMobileMenuRef && (
        <Box
          borderBottomWidth="1"
          borderColor="separator"
          display={{ lg: 'none' }}
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          paddingX={{ xs: '6', sm: '6', md: '10', lg: '10' }}
          paddingY="4"
          ref={docsMobileMenuRef}
        />
      )}
    </Box>
  );
}
