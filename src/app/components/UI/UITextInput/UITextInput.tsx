import React, {FC, useRef, useState} from 'react';
import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  TextInput,
  ViewStyle,
} from 'react-native';
import {UIBox} from '../UIBox';
import {UIText} from '../UIText';
import {COLORS} from '../../../../theme/colors.ts';
import {BORDER_RADIUS} from '../../../../theme/border_radius.ts';
import {SPACINGS} from '../../../../theme/spacings.ts';

export interface UITextInputProps extends Omit<TextInputProps, 'style'> {
  focused?: boolean;
  invalid?: boolean;
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardType;
  rightAccessory?: JSX.Element;
  leftAccessories?: JSX.Element;
  errorText?: string;
  inputRef?: any;
  onChange?: (value: any) => void;
  label?: string;
  name?: string;
  placeHolderTextColor?: string;
}

const UITextInput: FC<UITextInputProps> = ({
  focused,
  invalid,
  style,
  textInputStyle,
  onFocus,
  onBlur,
  keyboardType,
  placeholder,
  rightAccessory,
  leftAccessories,
  errorText,
  inputRef,
  onChange,
  label,
  placeHolderTextColor,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(!!focused);
  const ref = useRef<TextInput>(null);
  return (
    <UIBox>
      {label && (
        <UIText textRole={'Title2'} textWeight={'regular'} color={'variant2'}>
          {label}
        </UIText>
      )}
      <UIBox
        style={[
          styles.container,
          {
            borderColor: invalid
              ? COLORS.BASE_RED
              : isFocused
              ? COLORS.BASE_PRIMARY
              : COLORS.BASE_STORM_GREY,
            borderRadius: BORDER_RADIUS.S,
            marginTop: label ? SPACINGS.XS : SPACINGS.NONE,
            marginBottom: SPACINGS.XS,
            height: 52,
            justifyContent: 'center',
          },
          style,
        ]}>
        <UIBox style={styles.rowWrapper}>
          {leftAccessories && leftAccessories}
          <TextInput
            underlineColorAndroid={'transparent'}
            placeholder={placeholder}
            inlineImageLeft={'IconBack'}
            placeholderTextColor={placeHolderTextColor ?? COLORS.BASE_GREY2}
            autoFocus={focused}
            focusable={true}
            spellCheck={false}
            keyboardAppearance={'default'}
            keyboardType={keyboardType}
            autoCapitalize={'none'}
            textBreakStrategy={'balanced'}
            textContentType={'none'}
            autoCorrect={false}
            onChange={onChange}
            enablesReturnKeyAutomatically={true}
            onFocus={e => {
              setIsFocused(true);
              if (typeof onFocus === 'function') {
                onFocus(e);
              }
            }}
            onBlur={e => {
              setIsFocused(false);
              if (typeof onBlur === 'function') {
                onBlur(e);
              }
            }}
            {...rest}
            style={[
              styles.textInputBase,
              {
                paddingHorizontal: SPACINGS.M,
              },
              textInputStyle,
            ]}
            ref={inputRef ?? ref}
          />
          {!!rightAccessory && rightAccessory}
        </UIBox>
      </UIBox>
      {errorText && invalid ? (
        <UIText textRole={'Title2'} textWeight={'light'} color={'red'}>
          {errorText}
        </UIText>
      ) : null}
    </UIBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  errorTextStyle: {
    color: 'red',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputBase: {flex: 1, color: 'black'},
});

export default UITextInput;
