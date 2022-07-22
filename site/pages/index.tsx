/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Hero } from 'components/Hero/Hero';
import { CheckIcon } from 'components/Icons/Check';
import { CopyIcon } from 'components/Icons/Copy';
import { TickIcon } from 'components/Icons/Tick';
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
  return (
    <Box
      data-mode="dark"
      style={{
        background: 'radial-gradient(#ff66cc 0%, rgba(0,0,0,1) 100%);)',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <TitleAndMetaTags color="black" />
      <Header darkMode />
      <Wrapper>
        <Box marginTop="11" textAlign="center">
          <NextImage
            alt="SnowConeKit Neon Sign"
            height="227"
            src="/SnowConeKitNeon.png"
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

          <Box marginBottom={{ xs: '0', md: '4' }}>
            <NextLink href="/docs" passHref>
              <Button
                aria-label="View Docs"
                as="a"
                size="xl"
                variant="purpleGradient"
              >
                View the Docs
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Wrapper>

      <Hero />

      <Box display="flex" justifyContent="center" marginBottom="8">
        <InstallScript />
      </Box>

      <Playground />

      <Box
        backgroundColor="backgroundElevated"
        paddingY={{ xs: '11', lg: '12' }}
        style={{
          backgroundImage: 'linear-gradient(to bottom, #000, #1C1D1F)',
        }}
      >
        <Wrapper>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="h2"
            size={{ xs: '7', md: '9' }}
            style={{ lineHeight: 1 }}
            weight="bold"
          >
            SnowCone 🤝 Developers
          </Text>
          <Text
            align={{ xs: 'left', md: 'center' }}
            as="p"
            marginTop={{ xs: '7', md: '9' }}
            marginX="auto"
            size={{ xs: '4', md: '5' }}
            style={{ lineHeight: '28px', maxWidth: 720 }}
            weight="semibold"
          >
            SnowConeKit provides a fast, easy and highly customizable way for
            developers to add a great wallet experience to their application. We
            handle the hard stuff so developers and teams can focus on building
            amazing products and communities for their users.
          </Text>

          <Box marginTop={{ xs: '10', md: '11' }} marginX="auto">
            <Box
              as="ul"
              display="flex"
              flexWrap="wrap"
              left={{ lg: '9' }}
              marginLeft={{ md: '10', lg: '11' }}
              paddingLeft={{ md: '3', lg: '11' }}
              position="relative"
            >
              {[
                'Easy Installation',
                'Custom Themes',
                'Built-in Themes',
                'Custom Wallets List',
                'Light and Dark Mode',
                'Custom Chains',
                'App Store and Google Play Integration',
                'Custom Connect Button',
              ].map(value => (
                <Box
                  alignItems="center"
                  as="li"
                  display="flex"
                  gap="4"
                  key={value}
                  marginBottom="5"
                  width={{ xs: 'full', md: '1/2' }}
                >
                  <Box as="span" flexShrink={0}>
                    <TickIcon />
                  </Box>
                  <Text weight="bold">{value}</Text>
                </Box>
              ))}
            </Box>
            <Box
              marginTop={{ xs: '5', md: '11' }}
              textAlign={{ xs: 'left', md: 'center' }}
            >
              <NextLink href="/docs" passHref>
                <Button
                  as="a"
                  size="xl"
                  style={{ alignSelf: 'flex-start' }}
                  variant="purpleGradient"
                >
                  View the Docs
                </Button>
              </NextLink>
            </Box>
          </Box>
        </Wrapper>
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
            always looking to make SnowConeKit better, so please let us know how
            we can improve.
          </Text>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={{ xs: '5', sm: '8' }}
            justifyContent="center"
          >
            <Button
              as="a"
              href="https://twitter.com/snowconedao?lang=en"
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
              href="https://github.com/rainbow-me/rainbowkit/discussions/new?category=feedback"
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
                href="https://github.com/sirbenchalot757/snowconekit"
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
  );
}

function InstallScript() {
  const [requestCopy, setRequestCopy] = useState(false);
  const code = 'npm init @rainbow-me/SnowConeKit@latest';
  // const ref = useCoolMode('/NeonIconSvg.svg') as Ref<HTMLButtonElement>;

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
        // ref={ref}
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
