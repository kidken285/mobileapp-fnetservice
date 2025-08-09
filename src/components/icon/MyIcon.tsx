import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

export type IconFamily = 
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'Foundation'
  | 'Ionicons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

export type FontAwesomeVariant = 'solid' | 'regular' | 'light' | 'brands' | 'duotone';

export interface MyIconProps {
  family: IconFamily;
  name: string;
  size?: number;
  color?: string;
  style?: any;
  variant?: FontAwesomeVariant; // Chỉ dùng cho FontAwesome5 và FontAwesome6
}

const MyIcon: React.FC<MyIconProps> = ({
    family,
    name,
    size = 20,
    color = '#000',
    style,
    variant = 'solid',
}) => {
    const getVariantProps = () => {
        switch (variant) {
            case 'solid':
                return { solid: true };
            case 'regular':
                return { regular: true };
            case 'light':
                return { light: true };
            case 'brands':
                return { brand: true };
            case 'duotone':
                return { duotone: true };
            default:
                return { solid: true };
        }
    };

    const getIconComponent = () => {
        const variantProps = getVariantProps();
        
        switch (family) {
            case 'FontAwesome5':
                return (
                    <FontAwesome5Icon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                        {...variantProps}
                    />
                );
            case 'FontAwesome6':
                return (
                    <FontAwesome6Icon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                        {...variantProps}
                    />
                );
            case 'MaterialCommunityIcons':
                return (
                    <MaterialCommunityIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'MaterialIcons':
                return (
                    <MaterialIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'AntDesign':
                return (
                    <AntDesignIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'Entypo':
                return (
                    <EntypoIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'EvilIcons':
                return (
                    <EvilIconsIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'Feather':
                return (
                    <FeatherIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'FontAwesome':
                return (
                    <FontAwesomeIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'Foundation':
                return (
                    <FoundationIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'Ionicons':
                return (
                    <IoniconsIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'Octicons':
                return (
                    <OcticonsIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'SimpleLineIcons':
                return (
                    <SimpleLineIconsIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            case 'Zocial':
                return (
                    <ZocialIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
            default:
                return (
                    <MaterialCommunityIcon
                        name={name}
                        size={size}
                        color={color}
                        style={style}
                    />
                );
        }
    };

    return getIconComponent();
};

export default MyIcon;

// Export các icon components riêng lẻ để sử dụng trực tiếp nếu cần
export {
    FontAwesome5Icon,
    FontAwesome6Icon,
    MaterialCommunityIcon,
    MaterialIcon,
    AntDesignIcon,
    EntypoIcon,
    EvilIconsIcon,
    FeatherIcon,
    FontAwesomeIcon,
    FoundationIcon,
    IoniconsIcon,
    OcticonsIcon,
    SimpleLineIconsIcon,
    ZocialIcon,
};

// Helper components cho các variant FontAwesome
export const FontAwesome5SolidIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome5" variant="solid" />
);

export const FontAwesome5RegularIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome5" variant="regular" />
);

export const FontAwesome5LightIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome5" variant="light" />
);

export const FontAwesome5BrandsIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome5" variant="brands" />
);

export const FontAwesome6SolidIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome6" variant="solid" />
);

export const FontAwesome6RegularIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome6" variant="regular" />
);

export const FontAwesome6LightIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome6" variant="light" />
);

export const FontAwesome6BrandsIcon: React.FC<Omit<MyIconProps, 'family' | 'variant'>> = (props) => (
    <MyIcon {...props} family="FontAwesome6" variant="brands" />
);