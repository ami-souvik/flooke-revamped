import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function IconButton({ icon, invert, onPress, ...props }) {
    const colors = useThemeColor();
    const styles = makeStyles(invert ? colors.invert : colors)
    const { style } = props;
    delete props["style"]
    return <Pressable onPress={onPress} style={[styles.nativeview, style]} {...props}>
        {icon}
    </Pressable>
}

const makeStyles = (colors: any) => StyleSheet.create({
    nativeview: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})