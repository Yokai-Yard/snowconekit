/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Hero } from 'components/Hero/Hero';
import { CheckIcon } from 'components/Icons/Check';
import { CopyIcon } from 'components/Icons/Copy';
import { DocumentIcon } from 'components/Icons/Document';
import { DownloadIcon } from 'components/Icons/Download';
import { GithubIcon } from 'components/Icons/Github';
import { LockIcon } from 'components/Icons/Lock';
import { Link } from 'components/Link/Link';
import { Playground } from 'components/Playground/Playground';
import { Text } from 'components/Text/Text';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { Wrapper } from 'components/Wrapper/Wrapper';
import copy from 'copy-to-clipboard';
import { vars } from 'css/vars.css';
import ScLinks from 'lib/links';
import { useMounted } from 'lib/useMounted';

import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { useState } from 'react';
import {
  codeBoxBorder,
  codeBoxNav,
  codeBoxPosition,
  container,
  greenDot,
  madeForDevs,
  redDot,
  yellowDot,
} from '../css/index.css';
import bg from '../public/scKitBg.png';

export default function Home() {
  const comment = '//';

  const mounted = useMounted();

  return (
    <Box
      data-mode="dark"
      style={
        mounted
          ? {
              backgroundImage: `url(${bg.src})`,
              backgroundSize: 'cover',
              minHeight: '100vh',
              overflow: 'hidden',
            }
          : {
              background: 'linear-gradient(to right,#667fff, #ff66cc)',
              minHeight: '100vh',
              overflow: 'hidden',
            }
      }
    >
      <Box className={container} data-mode="dark">
        <TitleAndMetaTags color="black" />
        <Header darkMode />
        <Wrapper>
          <Box marginTop="11" textAlign="center">
            <NextImage
              alt="SnowConeKit Neon Sign"
              height="227"
              src="/SnowConeKitLogo.svg"
              width="1091"
            />
            <Text
              as="h2"
              marginBottom="5"
              size={{ xs: '7', md: '9' }}
              style={{ lineHeight: 1 }}
              weight="bold"
            >
              A beautiful wallet connector
            </Text>
          </Box>
        </Wrapper>

        <Hero />

        <Box
          display="flex"
          flexDirection="row"
          gap="5"
          justifyContent="center"
          marginBottom="8"
        >
          <InstallScript />
          <Box marginBottom={{ xs: '0', md: '2' }}>
            <NextLink href="/docs" passHref>
              <Button aria-label="View Docs" as="a" size="xl" variant="outline">
                <code>View the Docs</code>
              </Button>
            </NextLink>
          </Box>
        </Box>

        <Playground />

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          paddingY={{ xs: '11', lg: '12' }}
        >
          <Box width={{ xs: '0', sm: '0', md: '1/4' }} />
          <Box
            className={codeBoxPosition}
            width={{ xs: 'full', sm: 'full', md: '3/4', lg: '3/4', xl: '3/4' }}
          >
            <Box className={codeBoxBorder}>
              <Box className={codeBoxNav}>
                <Box className={redDot} />
                <Box className={yellowDot} />
                <Box className={greenDot} />
              </Box>
            </Box>
            <Box className={madeForDevs}>
              <span style={{ color: '#9eaeff' }}>const</span>
              <span style={{ color: '#ffca95' }}> madeForDevs</span>
              <span> = </span>
              <span> SnowConeKit</span> <br />
              <p style={{ color: '#bdddff' }}>
                <span> {comment} SnowConeKit provides a fast, easy and </span>
                <br />
                <span> {comment} highly customizable way for developers </span>
                <br />
                <span>
                  {' '}
                  {comment} to add a great wallet experience to their{' '}
                </span>
                <br />
                <span> {comment} application. We handle the hard stuff so</span>
                <br />
                <span> {comment} developers and teams can focus on </span>
                <br />
                <span> {comment} building amazing products and </span>
                <br />
                <span> {comment} communities for their users. </span>
                <br />
                <br />
              </p>
              <div>
                <span style={{ color: '#9eaeff' }}>SnowConeKit</span>.
                <span style={{ color: '#ffca95' }}>features </span>=
                <span style={{ color: '#667fff' }}> [ </span>
                <br />
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{ color: '#9fffcb' }}
                >
                  <span>&apos;Easy Installation&apos; ,</span>
                  <span>&apos;Built-in Themes&apos; ,</span>
                  <span>
                    &apos;Light and Dark Mode&apos;
                    <br />
                    <span style={{ color: '#667fff' }}>]</span>
                    <span style={{ color: 'white' }}>;</span>
                  </span>
                </Box>
                <br />
                <span style={{ color: '#9eaeff' }}>SnowConeKit</span>.
                <span style={{ color: '#ffca95' }}>customization </span>=
                <span style={{ color: '#667fff' }}> [ </span>
                <br />
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{ color: '#9fffcb' }}
                >
                  <span>&apos;Custom Themes&apos; ,</span>
                  <span>&apos;Custom Wallets List&apos; ,</span>
                  <span>&apos;Custom Connect Button&apos; ,</span>
                  <span>
                    &apos;Custom Chains&apos;
                    <br />
                    <span style={{ color: '#667fff' }}>]</span>
                    <span style={{ color: 'white' }}>;</span>
                  </span>
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
        <Box
          paddingX="10"
          paddingY={{ xs: '11', lg: '12' }}
          style={{
            backgroundColor: '#293A50',
          }}
        >
          <Box display="flex" flexDirection="row" gap="5">
            <Box width="full">
              <Text
                align="left"
                as="h4"
                size={{ xs: '6', md: '7' }}
                style={{ lineHeight: '1' }}
                weight="bold"
              >
                Made with ❤️ in dim candle light{' '}
                <span>
                  {' '}
                  <Box display={{ xs: 'inline', md: 'none' }}>
                    <object
                      data="/ScCandle.svg"
                      style={{ width: '36px' }}
                      type="image/svg+xml"
                    >
                      svg-animation
                    </object>
                  </Box>
                </span>{' '}
                {/*  <Box
                    as="span"
                    display={{ md: 'none' }}
                    marginLeft="2"
                    position="relative"
                    top="3"
                  >
                    <NextImage
                      alt="SnowCone logo"
                      height={36}
                      src="/NeonIcon.png"
                      width={36}
                    />
                  </Box> */}
                {/*  <Box
                    as="span"
                    display={{ xs: 'none', md: 'inline' }}
                    marginLeft="2"
                    position="relative"
                    top="3"
                  >
                    <NextImage
                      alt="SnowCone logo"
                      height={56}
                      src="/NeonIcon.png"
                      width={56}
                    />
                  </Box> */}
              </Text>

              <Text
                align="left"
                as="p"
                marginY={{ xs: '7', md: '9' }}
                size={{ xs: '3', md: '4' }}
                style={{ lineHeight: '28px', maxWidth: 720 }}
                weight="normal"
              >
                Building SnowConeKit has been an incredibly fun effort across
                many people at SnowCone and our frens at other companies.
                We&apos;re always looking to make SnowConeKit better, so please
                let us know how we can improve.
              </Text>

              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={{ xs: '4', sm: '6' }}
                justifyContent="flex-start"
              >
                <Button
                  as="a"
                  href={ScLinks.twitter}
                  shadow
                  size="l"
                  variant="outline"
                >
                  <Box
                    as="span"
                    marginX={{ sm: '4' }}
                    textAlign="center"
                    width="full"
                  >
                    Follow us on Twitter
                  </Box>
                </Button>
                <Button
                  as="a"
                  href={ScLinks.feedback}
                  shadow
                  size="l"
                  target="_blank"
                  variant="contrast"
                >
                  <Box as="span" textAlign="center" width="full">
                    Share feedback with us
                  </Box>
                </Button>
              </Box>

              <Box
                alignItems="flex-start"
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                gap="6"
                justifyContent="flex-start"
                marginTop={{ xs: '8', lg: '10' }}
                textAlign="center"
              >
                <Text size="4" weight="bold">
                  <Link href={ScLinks.github} variant="gray">
                    <GithubIcon /> github
                  </Link>
                </Text>
                <Text size="4" weight="bold">
                  <Link href={ScLinks.mediaKit} variant="gray">
                    <DownloadIcon /> media kit
                  </Link>
                </Text>
                <Text size="4" weight="bold">
                  <Link href={ScLinks.terms} variant="gray">
                    <DocumentIcon /> terms of use
                  </Link>
                </Text>
                <Text size="4" weight="bold">
                  <Link href={ScLinks.privacy} variant="gray">
                    <LockIcon /> privacy policy
                  </Link>
                </Text>
                <Text color="labelTertiary" size="4" weight="bold">
                  © SnowCone
                </Text>
              </Box>
            </Box>
            <Box
              display={{ xs: 'none', md: 'inline' }}
              marginTop="auto"
              width="1/4"
            >
              <object
                data="/ScCandle.svg"
                style={{ width: '320px' }}
                type="image/svg+xml"
              >
                svg-animation
              </object>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function InstallScript() {
  const [requestCopy, setRequestCopy] = useState(false);
  // fixit
  const code = 'npm init @snowcone/snowconekit@latest';

  React.useEffect(() => {
    if (requestCopy) copy(code);
    setTimeout(() => setRequestCopy(false), 3000);
  }, [requestCopy]);

  return (
    <Box
      alignItems="center"
      backgroundColor="fillElevated"
      borderRadius="round"
      color="label"
      display={{ xs: 'none', md: 'inline-flex' }}
      fontSize="2"
      paddingX="7"
      style={{ height: 44, lineHeight: 1 }}
    >
      <code>{code}</code>
      <Button
        aria-label="Copy to clipboard"
        marginLeft="7"
        onClick={() => setRequestCopy(true)}
        shape="circle"
        size="xs"
        style={{
          color: requestCopy ? vars.colors.green : vars.colors.labelTertiary,
        }}
        tabIndex={-1}
        variant="ghost"
      >
        {requestCopy ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </Box>
  );
}
