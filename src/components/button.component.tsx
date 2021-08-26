import React, {FC, useContext} from 'react';
import {
    ButtonProps,
    StyleProp,
    StyleSheet,
    TextProps, TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View
} from 'react-native';
import {TextComponent} from './text.component';
import {ThemeContext} from '../providers/theme.provider';

interface Props extends TouchableOpacityProps {
    textStyle?: StyleProp<TextStyle>
}
export const ButtonComponent: FC<Props> = (props) => {

    const {theme} = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            padding: theme.spacing.LG,
            backgroundColor: theme.colors.ACCENT,
            borderRadius: theme.spacing.MD,
            marginBottom: theme.spacing.MD,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            color: "#FFFFFF",
            textAlign: "center",
            fontWeight: "bold",
        }
    })

    return (
        <TouchableOpacity {...props} style={[styles.container, props.style]}>
            <TextComponent style={[styles.text, props.textStyle]}>{props.children}</TextComponent>
        </TouchableOpacity>
    )
}
