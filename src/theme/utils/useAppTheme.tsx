import * as React from 'react';
import {ColorValue} from 'react-native';
import {MutableRefObject, useEffect} from 'react';
import {TBaseTheme, TDictionary, TFontFamily, TUITextRole} from '../types';

const DEFAULT_THEME = {
  spacings: {},
  colors: {},
  fonts: {},
  UIBox: {
    colors: {},
  },
  UIText: {
    colors: {},
    roles: {},
  },
};
const themeContext = React.createContext(DEFAULT_THEME);
themeContext.displayName = 'ThemeContext';

const InnerThemeProvider = themeContext.Provider;
export const ThemeProvider = <T extends typeof DEFAULT_THEME>(
  props: React.ProviderProps<T> & {
    themeRef?: React.Ref<Readonly<T>>;
  },
) => {
  useEffect(() => {
    if (props.themeRef) {
      (props.themeRef as MutableRefObject<T>).current = props.value;
    }
  }, [props.themeRef, props.value]);
  return (
    <InnerThemeProvider value={props.value}>
      {props.children}
    </InnerThemeProvider>
  );
};
export const ThemeConsumer = themeContext.Consumer;

export function useAppTheme<
  Theme extends TBaseTheme<
    Fonts,
    Colors,
    Spacings,
    BorderRadii,
    UITextRoles,
    UITextColors,
    UIBoxColors
  >,
  Fonts extends TDictionary<TFontFamily> = Theme['fonts'],
  Colors extends TDictionary<ColorValue> = Theme['colors'],
  Spacings extends TDictionary<number> = Theme['spacings'],
  BorderRadii extends TDictionary<number> = Theme['borderRadii'],
  UITextRoles extends TDictionary<TUITextRole> = Theme['UIText']['roles'],
  UITextColors extends TDictionary<keyof Colors> = Theme['UIText']['colors'],
  UIBoxColors extends TDictionary<keyof Colors> = Theme['UIBox']['colors'],
>() {
  return React.useContext(themeContext) as Theme;
}
