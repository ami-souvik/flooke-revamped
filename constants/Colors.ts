/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const Static = {
  // whites
  white: '#ffffff',

  gunmetal: '#2A2D34',
  charcoal: '#2E4052',
  // blacks
  richblack: '#101419',
  licorice: '#0B0014',
  // reds
  red: '#FF686B',
  // yellows
  yellow: 'yellow',
  mindaro: '#E9FF70',
};

export interface Colors {
  text: string;
  foreground: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  invert: {
    text: string;
    background: string;
  };

  white: string;
  gunmetal: string;
  charcoal: string;
  richblack: string;
  licorice: string;
  red: string;
  yellow: string;
  mindaro: string;
}

export const Colors = {
  light: {
    text: '#11181C',
    foreground: '#ffffff',
    background: '#ffffff',
    tint: tintColorLight,
    border: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    invert: {
      text: '#ECEDEE',
      background: Static.charcoal,
    },
    ...Static,
  },
  dark: {
    text: Static.white,
    foreground: Static.gunmetal,
    background: Static.gunmetal,
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    invert: {
      text: Static.charcoal,
      background: '#ECEDEE',
    },
    ...Static,
  },
};
