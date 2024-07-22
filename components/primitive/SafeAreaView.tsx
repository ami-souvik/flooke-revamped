import React from "react";
import { StyleSheet } from "react-native"
import { SafeAreaView as NativeSAV, SafeAreaViewProps } from 'react-native-safe-area-context';
import { Fonts } from "@/constants/Fonts"
import { useThemeColor } from "@/hooks/useThemeColor";

export function SafeAreaView({ children, ...props }: SafeAreaViewProps) {
    const colors = useThemeColor();
    const styles = makeStyles(colors)
    const { style } = props;
    delete props["style"]
    for (const key in style) {
        if (style[key]) {
            Object.freeze(style[key]);
        }
    }
    return (
        <NativeSAV
            style={[styles.nativesav, style]}
        >{children}</NativeSAV>
    )
}

const makeStyles = (colors: any) => StyleSheet.create({
    nativesav: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background
    }
})