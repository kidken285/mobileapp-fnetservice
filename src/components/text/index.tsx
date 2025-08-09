import React from 'react';
import {Text, TextProps, StyleProp, TextStyle} from 'react-native';


/**
 * Cấu hình cho tablet
Body (mặc định trên tablet): 18 pt/sp
Body nhỏ / phụ: 16 pt/sp
Caption/overline: 14 pt/sp
Button/inputs: 18 pt/sp
Title: 22–24 pt/sp
Headline/H1: 28–32 pt/sp
 */
// All Roboto font variants available in assets/fonts
export type MyTextVariant =
  | 'thin' // fontWeight: 100
  | 'thinItalic' // fontWeight: 100
  | 'light' // fontWeight: 300
  | 'lightItalic' // fontWeight: 300
  | 'regular' // fontWeight: 400
  | 'italic' // fontWeight: 400
  | 'medium' // fontWeight: 500
  | 'mediumItalic' // fontWeight: 500
  | 'semiBold' // fontWeight: 600
  | 'bold' // fontWeight: 700
  | 'boldItalic' // fontWeight: 700
  | 'black' // fontWeight: 900
  | 'blackItalic'; // fontWeight: 900

// Mapping variant to fontFamily (must match font files in assets/fonts)
const fontFamilyMap: Record<MyTextVariant, string> = {
  thin: 'Roboto-Thin', // fontWeight: 100
  thinItalic: 'Roboto-ThinItalic', // fontWeight: 100
  light: 'Roboto-Light', // fontWeight: 300
  lightItalic: 'Roboto-LightItalic', // fontWeight: 300
  regular: 'Roboto-Regular', // fontWeight: 400
  italic: 'Roboto-Italic', // fontWeight: 400
  medium: 'Roboto-Medium', // fontWeight: 500
  mediumItalic: 'Roboto-MediumItalic', // fontWeight: 500
  semiBold: 'Roboto-SemiBold', // fontWeight: 600
  bold: 'Roboto-Bold', // fontWeight: 700
  boldItalic: 'Roboto-BoldItalic', // fontWeight: 700
  black: 'Roboto-Black', // fontWeight: 900
  blackItalic: 'Roboto-BlackItalic', // fontWeight: 900
};

// Default values
const defaultFontSize = 18;
const defaultColor = '#000000';
const defaultVariant: MyTextVariant = 'regular';

export interface MyTextProps extends Omit<TextProps, 'style'> {
  variant?: MyTextVariant;
  color?: string;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const MyText: React.FC<MyTextProps> = ({
  variant = defaultVariant,
  color = defaultColor,
  fontSize = defaultFontSize,
  style,
  children,
  ...rest
}) => {
  const textStyle: TextStyle = {
    fontFamily: fontFamilyMap[variant],
    fontSize,
    color,
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

export default MyText;
