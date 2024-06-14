/**
 * The fonts to use
 *
 * @example
 * FontName: { bold: "FontName-Bold" }
 */
export type TFontName = string;
export interface TFontFamily {
  bold?: TFontName;
  regular: TFontName;
  light?: TFontName;
}

export const FONTS: Record<'Default', string> = {
  Default: 'OpenSans-Regular'
};
