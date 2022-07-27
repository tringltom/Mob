import React from "react";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";

import { useTailwind } from "tailwind-rn";
import { classNames } from "../common/utils/commonUtils";

enum Variant {
    primary,
    secondary,
    success,
    error,
    primaryOutlined,
    secondaryOutlined,
    successOutlined,
    errorOutlined,
    text
}

enum Size {
    xs,
    sm,
    md,
    lg,
}

enum Font {
    xs,
    sm,
    md,
    lg,
    inline
}

enum Utils {
    disabled    
}

const VARIANT_MAPS: Record<Variant, string> = {
    [Variant.primary]:
        "bg-primary justify-center items-center text-white text-center rounded-lg",
    [Variant.secondary]:
        "bg-secondary justify-center items-center text-center border-3 border-light text-white hover:border-white rounded-lg",
    [Variant.success]:
        "bg-success justify-center items-center text-white text-center border-3 border-light text-white hover:border-white rounded-lg",
    [Variant.error]:
        "bg-error justify-center items-center text-white text-center border-3 border-light text-white hover:border-white rounded-lg",
    [Variant.primaryOutlined]:
        "bg-transparent justify-center items-center text-center border-3 border-light text-white hover:border-white rounded-lg",
    [Variant.secondaryOutlined]:
        "bg-transparent justify-center items-center text-center border-3 border-secondary text-white hover:border-white rounded-lg",
    [Variant.successOutlined]:
        "bg-transparent justify-center items-center text-center border-3 border-success text-white hover:border-white rounded-lg",
    [Variant.errorOutlined]:
        "bg-transparent justify-center items-center text-center border-3 border-error text-white hover:border-white rounded-lg",
    [Variant.text]: "bg-transparent justify-center items-center text-center text-primary"
};

const SIZE_MAPS: Record<Size, string> = {
    [Size.xs]: "py-2 px-3",
    [Size.sm]: "py-2 px-3",
    [Size.md]: "py-4 px-5",
    [Size.lg]: "p-4 px-5",
};

const FONT_MAPS: Record<Font, string> = {
    [Font.xs]: "py-2 px-3 text-xs",
    [Font.sm]: "py-2 px-3 text-sm",
    [Font.md]: "py-4 px-5 text-lg",
    [Font.lg]: "p-4 px-5 text-xl md:text-3xl",
    [Font.inline]: "text-sm"
};

const UTIL_MAPS: Record<Utils, string> = {
    [Utils.disabled]: "opacity-50 pointer-events-none",    
};

type IButtonProps = React.PropsWithChildren <{
    title: string;
    variant: Variant;
    size: Size;
    font: Font;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;
}>

const Button = (props: IButtonProps) => {

    const { title, variant, size, loading, disabled, onPress } = props;

    const allStyles = classNames(VARIANT_MAPS[variant],
        SIZE_MAPS[size],
        disabled ? UTIL_MAPS[Utils.disabled] : null)

    const tailwind = useTailwind();

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={tailwind(allStyles)}>
            <Text style={tailwind('font-regular text-xl text-white')}>{loading ? <ActivityIndicator size="small" color="white" /> : title}</Text>
        </TouchableOpacity>
    )
}

Button.defaultProps = {
    variant: Variant.primary,
    size: Size.lg,
    font: Font.lg
  };
  
  Button.variant = Variant;
  Button.size = Size;
  Button.font = Font;

export default Button;