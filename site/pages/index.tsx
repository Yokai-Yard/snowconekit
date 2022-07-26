/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Hero } from 'components/Hero/Hero';
import { CheckIcon } from 'components/Icons/Check';
import { CopyIcon } from 'components/Icons/Copy';
import { Link } from 'components/Link/Link';
import { Playground } from 'components/Playground/Playground';
import { Text } from 'components/Text/Text';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { Wrapper } from 'components/Wrapper/Wrapper';
import copy from 'copy-to-clipboard';
import { vars } from 'css/vars.css';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { useState } from 'react';

export default function Home() {
  const comment = '//';
  return (
    <Box
      data-mode="dark"
      style={{
        background: 'radial-gradient(#ff66cc 0%, rgba(0,0,0,1) 100%);)',
        backgroundImage: 'url(/ScKitBg.png)',
        backgroundSize: 'cover',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        data-mode="dark"
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          minHeight: '100vh',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(50px)',
          /*           backgroundImage: 'url(/bodyBg.png)', */
          borderRadius: '8px',
          borderWidth: '2px',
          borderColor: 'linear-gradient(#FFFFFFAC 0%, #ffffff 100%);)',
        }}
      >
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
              A beautiful wallet experience
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

        <Box display="flex" paddingY={{ xs: '11', lg: '12' }}>
          <Box
            style={{
              width: '1456px',
              height: '589px',
              marginLeft: 'auto',
              backgroundColor: '#293A50',
              borderRadius: '8px',
              overflow: 'hidden',
              borderWidth: '2px',
              borderColor:
                'linear-gradient(rgba(255, 255, 255, 1) 0%, #ffffff 100%))',
            }}
          >
            <Box
              style={{
                height: '40px',
                backgroundColor: '#36465b',
                padding: '15px 20px',
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                gap="5"
                justifyContent="flex-start"
              >
                <Box
                  style={{
                    height: '10px',
                    width: '10px',
                    borderRadius: '50px',
                    backgroundColor: '#ff6680',
                  }}
                />
                <Box
                  style={{
                    height: '10px',
                    width: '10px',
                    borderRadius: '50px',
                    backgroundColor: '#ffca95',
                  }}
                />
                <Box
                  style={{
                    height: '10px',
                    width: '10px',
                    borderRadius: '50px',
                    backgroundColor: '#66ff99',
                  }}
                />
              </Box>
            </Box>
            <Box
              paddingLeft="10"
              paddingTop="10"
              style={{ display: 'block', marginTop: 'auto' }}
            >
              <span style={{ color: '#9eaeff' }}>const</span>
              <span style={{ color: '#ffca95' }}> madeForDevs</span>
              <span> = </span>
              <span> SnowConeKit</span> <br />
              <p style={{ color: '#bdddff' }}>
                <span>
                  {' '}
                  {comment} SnowConeKit provides a fast, easy and highly{' '}
                </span>
                <br />
                <span>
                  {' '}
                  {comment} customizable way for developers to add a{' '}
                </span>
                <br />
                <span>
                  {' '}
                  {comment} great wallet experience to their application.{' '}
                </span>
                <br />
                <span>
                  {' '}
                  {comment} We handle the hard stuff so developers and
                </span>
                <br />
                <span> {comment} teams can focus on building</span>
                <br />
                <span> {comment} amazing products and </span>
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
          backgroundColor="backgroundElevated"
          data-mode="light"
          paddingY={{ xs: '11', lg: '12' }}
        >
          <Wrapper>
            <Text
              align={{ xs: 'left', md: 'center' }}
              as="h2"
              size={{ xs: '7', md: '9' }}
              style={{ lineHeight: '1' }}
              weight="bold"
            >
              Made with ❤️ by your frens at{' '}
              <Box
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
              </Box>
              <Box
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
              </Box>
            </Text>

            <Text
              align={{ xs: 'left', md: 'center' }}
              as="p"
              marginX="auto"
              marginY={{ xs: '7', md: '9' }}
              size={{ xs: '4', md: '5' }}
              style={{ lineHeight: '28px', maxWidth: 720 }}
              weight="semibold"
            >
              Building SnowConeKit has been an incredibly fun effort across many
              people at SnowCone and our frens at other companies. We&apos;re
              always looking to make SnowConeKit better, so please let us know
              how we can improve.
            </Text>

            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={{ xs: '5', sm: '8' }}
              justifyContent="center"
            >
              <Button
                as="a"
                href="https://twitter.com/rainbowdotme"
                shadow
                size="xl"
                variant="blueGradient"
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
                href="https://github.com/rainbow-me/SnowConeKit/discussions/new?category=feedback"
                shadow
                size="xl"
                target="_blank"
                variant="pinkGradient"
              >
                <Box as="span" textAlign="center" width="full">
                  Share feedback with us
                </Box>
              </Button>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap="6"
              justifyContent="center"
              marginTop={{ xs: '11', lg: '12' }}
              textAlign="center"
            >
              <Text size="4" weight="bold">
                <Link
                  href="https://github.com/rainbow-me/SnowConeKit"
                  variant="gray"
                >
                  <span data-emoji>👾</span> github
                </Link>
              </Text>
              <Text size="4" weight="bold">
                <Link href="https://rainbow.me/media-kit.zip" variant="gray">
                  <span data-emoji>⬇️</span> media kit
                </Link>
              </Text>
              <Text size="4" weight="bold">
                <Link href="https://rainbow.me/terms-of-use" variant="gray">
                  <span data-emoji>📜</span> terms of use
                </Link>
              </Text>
              <Text size="4" weight="bold">
                <Link href="https://rainbow.me/privacy" variant="gray">
                  <span data-emoji>🔒</span> privacy policy
                </Link>
              </Text>
              <Text color="labelTertiary" size="4" weight="bold">
                © SnowCone
              </Text>
            </Box>
          </Wrapper>
        </Box>
      </Box>
    </Box>
  );
}

function InstallScript() {
  const [requestCopy, setRequestCopy] = useState(false);
  // fixit
  const code = 'npm init @sirbenchalot757/SnowConeKit@latest';

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
