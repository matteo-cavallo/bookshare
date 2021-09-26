import React, {FC, useContext} from 'react';
import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import {TextComponent} from './text.component';
import {ThemeContext} from 'providers/theme.provider';

interface Props extends TouchableOpacityProps {
    textStyle?: StyleProp<TextStyle>
    loading?: boolean
}
export const ButtonComponent: FC<Props> = (props) => {

    const {theme} = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            padding: theme.spacing.LG,
            backgroundColor: !props.disabled ?  theme.colors.ACCENT : theme.colors.ACCENT_DISABLED,
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

            {
                props.loading
                    ? <ActivityIndicator color={"#FFFFFF"}/>
                    : <TextComponent style={[styles.text, props.textStyle]}>{props.children}</TextComponent>
            }
        </TouchableOpacity>
    )
}
