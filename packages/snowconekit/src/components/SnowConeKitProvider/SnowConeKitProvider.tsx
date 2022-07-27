import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { cssStringFromTheme } from '../../css/cssStringFromTheme';
import { ThemeVars } from '../../css/sprinkles.css';
import { lightTheme } from '../../themes/lightTheme';
import { TransactionStoreProvider } from '../../transactions/TransactionStoreContext';
import { AppContext, defaultAppInfo, DisclaimerComponent } from './AppContext';
import { AvatarComponent, AvatarContext, defaultAvatar } from './AvatarContext';
import {
  SnowConeKitChain,
  SnowConeKitChainContext,
} from './SnowConeKitChainContext';
import { ShowRecentTransactionsContext } from './ShowRecentTransactionsContext';
import { provideRainbowKitChains } from './provideSnowConeKitChains';
import { clearWalletConnectDeepLink } from './walletConnectDeepLink';
import { ModalProvider } from './ModalContext';
import { usePreloadImages } from './usePreloadImages';
const ThemeIdContext = createContext<string | undefined>(undefined);
export const ThemeContext = createContext<ThemeVars>(lightTheme());
const attr = 'data-rk';

const createThemeRootProps = (id: string | undefined) => ({ [attr]: id || '' });

const createThemeRootSelector = (id: string | undefined) => {
  if (id && !/^[a-zA-Z0-9_]+$/.test(id)) {
    throw new Error(`Invalid ID: ${id}`);
  }

  return id ? `[${attr}="${id}"]` : `[${attr}]`;
};

export const useThemeRootProps = () => {
  const id = useContext(ThemeIdContext);
  return createThemeRootProps(id);
};

type preTheme = {
  lightMode: ThemeVars;
  darkMode: ThemeVars;
};

export type Theme = ThemeVars | preTheme;

const convertTheme = (theme: Theme): ThemeVars => {
  const lightMode = lightTheme();

  if (theme.hasOwnProperty('lightMode')) {
    return lightMode as ThemeVars;
  }
  return theme as ThemeVars;
};

export interface SnowConeKitProviderProps {
  chains: SnowConeKitChain[];
  id?: string;
  children: ReactNode;
  theme?: Theme;
  showRecentTransactions?: boolean;
  appInfo?: {
    appName?: string;
    learnMoreUrl?: string;
    disclaimer?: DisclaimerComponent;
  };
  avatar?: AvatarComponent;
}

const defaultTheme = lightTheme();

export function SnowConeKitProvider({
  chains,
  id,
  theme = defaultTheme,
  children,
  appInfo,
  showRecentTransactions = false,
  avatar,
}: SnowConeKitProviderProps) {
  const snowconekitChains = useMemo(
    () => provideRainbowKitChains(chains),
    [chains]
  );

  usePreloadImages();

  const newTheme = convertTheme(theme);
  useAccount({ onDisconnect: clearWalletConnectDeepLink });

  if (typeof theme === 'function') {
    throw new Error(
      'A theme function was provided to the "theme" prop instead of a theme object. You must execute this function to get the resulting theme object.'
    );
  }

  const selector = createThemeRootSelector(id);

  const appContext = {
    ...defaultAppInfo,
    ...appInfo,
  };

  const avatarContext = avatar ?? defaultAvatar;

  return (
    <SnowConeKitChainContext.Provider value={snowconekitChains}>
      <ShowRecentTransactionsContext.Provider value={showRecentTransactions}>
        <TransactionStoreProvider>
          <AvatarContext.Provider value={avatarContext}>
            <AppContext.Provider value={appContext}>
              <ThemeIdContext.Provider value={id}>
                <ThemeContext.Provider value={newTheme}>
                  <ModalProvider>
                    {theme ? (
                      <div {...createThemeRootProps(id)}>
                        <style
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            // Selectors are sanitized to only contain alphanumeric
                            // and underscore characters. Theme values generated by
                            // cssStringFromTheme are sanitized, removing
                            // characters that terminate values / HTML tags.
                            __html: [
                              `${selector}{${cssStringFromTheme(
                                'lightMode' in theme ? theme.lightMode : theme
                              )}}`,

                              'darkMode' in theme
                                ? `@media(prefers-color-scheme:dark){${selector}{${cssStringFromTheme(
                                    theme.darkMode,
                                    { extends: theme.lightMode }
                                  )}}}`
                                : null,
                            ].join(''),
                          }}
                        />

                        {children}
                      </div>
                    ) : (
                      children
                    )}
                  </ModalProvider>
                </ThemeContext.Provider>
              </ThemeIdContext.Provider>
            </AppContext.Provider>
          </AvatarContext.Provider>
        </TransactionStoreProvider>
      </ShowRecentTransactionsContext.Provider>
    </SnowConeKitChainContext.Provider>
  );
}