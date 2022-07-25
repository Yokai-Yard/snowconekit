/* eslint-disable sort-keys-fix/sort-keys-fix */
import * as RadioGroup from '@radix-ui/react-radio-group';
import {
  __private__,
  darkTheme,
  lightTheme,
  midnightTheme,
  SnowConeKitProvider,
} from '@sirbenchalot/snowconekit';
import clsx from 'clsx';
import { Box } from 'components/Box/Box';
import { chains, Provider } from 'components/Provider/Provider';
import { Text } from 'components/Text/Text';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { motion } from 'framer-motion';
import { useMounted } from 'lib/useMounted';
import React, { useState } from 'react';
import { radio, ring } from './Playground.css';
const { DesktopOptions, MobileOptions, dialogContent, dialogContentMobile } =
  __private__;

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
  midnight: midnightTheme,
};

type Modes = keyof typeof THEMES;
type ThemeOptions = Parameters<typeof lightTheme>[0];
type Accents = ThemeOptions['accentColor'];
type Radii = ThemeOptions['borderRadius'];

const gradientColors: Record<Accents, any> = {
  blue: [
    [158, 174, 255],
    [102, 127, 255],
    [32, 83, 203],
  ],
  purple: [
    [189, 221, 255],
    [140, 171, 207],
    [93, 124, 158],
  ],
  pink: [
    [255, 154, 255],
    [255, 102, 204],
    [201, 46, 155],
  ],
  red: [
    [255, 153, 175],
    [255, 102, 128],
    [199, 49, 84],
  ],
  orange: [
    [255, 202, 149],
    [255, 153, 102],
    [200, 106, 58],
  ],
  green: [
    [159, 255, 203],
    [102, 255, 153],
    [29, 203, 106],
  ],
};

export function Playground() {
  const [mode, setMode] = useState<Modes>('light');
  const [accent, setAccent] = useState<Accents>('blue');
  const [radii, setRadii] = useState<Radii>('large');

  const handleModeChange = value => setMode(value);
  const handleAccentChange = value => setAccent(value);
  const handleRadiiChange = value => setRadii(value);

  const selectedTheme = THEMES[mode]({
    ...THEMES[mode].accentColors[accent],
    borderRadius: radii,
  });

  // const gradient = gradientColors[accent];

  return useMounted() ? (
    <Provider>
      <SnowConeKitProvider
        chains={chains}
        id="playground"
        theme={selectedTheme}
      >
        <Box
          marginTop={{ md: '11', lg: '12' }}
          paddingY={{ xs: '11', lg: '12' }}
          position="relative"
          zIndex="10"
        >
          <Box
            inset="0"
            position="absolute"
            style={{ height: '100%', width: '100%' }}
          >
            {/*  {isAndroid() && (
          <motion.div
            animate={{
              backgroundImage: `linear-gradient(136deg, rgb(${gradient[2]}) 0%, rgb(${gradient[0]}) 100%)`,
            }}
            initial={false}
            style={{ width: '100%', height: '100%' }}
            transition={{ duration: 1.5 }}
          />
        )} */}

            {/* {!isAndroid() && (
            <MeshGradient
              backgroundColor="#1FCC1F"
              u_c1={gradient[0]}
              u_c2={gradient[1]}
              u_c3={gradient[2]}
            />
            )} */}
          </Box>

          <Box position="relative">
            <Wrapper>
              <Text
                align={{ xs: 'left', md: 'center' }}
                as="h2"
                size={{ xs: '7', md: '9' }}
                style={{ lineHeight: 1 }}
                weight="bold"
              >
                Give SnowConeKit a spin
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
                Make your Ethereum login experience feel right at home on your
                website. SnowConeKit allows you to fully customize color, border
                radius, wallet providers and a lot more — all through an
                easy-to-use API. Get a feel for it below!
              </Text>
            </Wrapper>

            <Box
              marginX={{ xs: '0', md: 'auto' }}
              marginY={{ xs: '9', md: '11' }}
              paddingX="10"
              style={{
                maxWidth: 'fit-content',
                userSelect: 'none',
              }}
            >
              <Box display={{ xs: 'none', md: 'block' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    className={dialogContent}
                    style={{
                      width: 712,
                    }}
                  >
                    <DesktopOptions onClose={() => {}} />
                  </div>
                  {/* This div is placed on top of rainbowkit to make it non-interactive.
                  pointer-events: none; was forcing scrollbar to show:
                  https://linear.app/rainbow/issue/RNBW-3686/site-playground-wallet-list-showing-a-scrollbar */}
                  <div style={{ position: 'absolute', inset: 0 }} />
                </div>
              </Box>

              <Box display={{ md: 'none' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    className={clsx(dialogContent, dialogContentMobile)}
                    style={{
                      maxWidth: 420,
                      width: '100%',
                    }}
                  >
                    <MobileOptions onClose={() => {}} />
                  </div>
                  {/* This div is placed on top of rainbowkit to make it non-interactive.
                  pointer-events: none; was forcing scrollbar to show:
                  https://linear.app/rainbow/issue/RNBW-3686/site-playground-wallet-list-showing-a-scrollbar */}
                  <div style={{ position: 'absolute', inset: 0 }} />
                </div>
              </Box>
            </Box>

            <Box
              marginX={{ xs: '0', md: 'auto' }}
              paddingX="10"
              style={{ maxWidth: 'fit-content' }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
                flexWrap="wrap"
                gap={{ xs: '8', md: '10' }}
              >
                <div>
                  <Text
                    size={{ xs: '3', md: '4' }}
                    style={{ mixBlendMode: 'overlay' }}
                    weight="bold"
                  >
                    Mode
                  </Text>
                  <ControlBox>
                    <RadioGroup.Root
                      name="mode"
                      onValueChange={handleModeChange}
                      style={{ display: 'inline-flex', gap: 19 }}
                      value={mode}
                    >
                      <Radio
                        activeValue={mode}
                        aria-label="Light"
                        id="mode"
                        style={{ backgroundColor: 'white' }}
                        value="light"
                      />
                      <Radio
                        activeValue={mode}
                        aria-label="Dark"
                        id="mode"
                        style={{ backgroundColor: '#1A1B1F' }}
                        value="dark"
                      />
                      <Radio
                        activeValue={mode}
                        aria-label="Darker"
                        id="mode"
                        style={{ backgroundColor: 'black' }}
                        value="midnight"
                      />
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
                <div>
                  <Text
                    size={{ xs: '3', md: '4' }}
                    style={{ mixBlendMode: 'overlay' }}
                    weight="bold"
                  >
                    Accent
                  </Text>
                  <ControlBox>
                    <RadioGroup.Root
                      name="mode"
                      onValueChange={handleAccentChange}
                      style={{
                        display: 'inline-flex',
                        gap: 19,
                        flexWrap: 'wrap',
                      }}
                      value={accent}
                    >
                      {(Object.keys(gradientColors) as Accents[]).map(color => (
                        <Radio
                          activeValue={accent}
                          aria-label={color}
                          id="accent"
                          key={color}
                          style={{
                            backgroundColor: THEMES[mode]({
                              ...THEMES[mode].accentColors[color],
                            }).colors.accentColor,
                          }}
                          value={color}
                        />
                      ))}
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
                <div>
                  <Text
                    size={{ xs: '3', md: '4' }}
                    style={{ mixBlendMode: 'overlay' }}
                    weight="bold"
                  >
                    Radius
                  </Text>
                  <ControlBox>
                    <RadioGroup.Root
                      name="mode"
                      onValueChange={handleRadiiChange}
                      style={{ display: 'inline-flex', gap: 19 }}
                      value={radii}
                    >
                      <Radio
                        activeValue={radii}
                        aria-label="Small"
                        data-label="L"
                        id="radii"
                        value="large"
                      />
                      <Radio
                        activeValue={radii}
                        aria-label="Medium"
                        data-label="M"
                        id="radii"
                        value="medium"
                      />
                      <Radio
                        activeValue={radii}
                        aria-label="Large"
                        data-label="S"
                        id="radii"
                        value="small"
                      />
                      <Radio
                        activeValue={radii}
                        aria-label="None"
                        data-label="—"
                        id="radii"
                        value="none"
                      />
                    </RadioGroup.Root>
                  </ControlBox>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </SnowConeKitProvider>
    </Provider>
  ) : null;
}

function ControlBox(props) {
  return (
    <Box
      alignItems="flex-start"
      display="flex"
      flexDirection="column"
      gap="4"
      marginTop={{ md: '5', xs: '3' }}
      {...props}
    />
  );
}

function Radio({ activeValue, id, value, ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      <RadioGroup.Item className={radio} value={value} {...props} />
      {activeValue === value && <Ring id={id} />}
    </div>
  );
}

function Ring({ id }) {
  return (
    <motion.div
      className={ring}
      layoutId={id}
      transition={{
        duration: 0.65,
        type: 'spring',
      }}
    />
  );
}
