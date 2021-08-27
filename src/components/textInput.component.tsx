import React, {FC, useContext} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {ThemeContext} from '../providers/theme.provider';

interface TextInputComponentProps extends TextInputProps {
    leadingItem?: FC

}

export const TextInputComponent: FC<TextInputComponentProps> = (props) => {

    const {theme} = useContext(ThemeContext)

    const style = StyleSheet.create({
        container: {
            flex:1,
            flexDirection: "row",
            padding: theme.spacing.LG,
            backgroundColor: theme.colors.FILL_TERTIARY,
            borderRadius: theme.spacing.LG,
            marginBottom: theme.spacing.MD
        },
        textInput: {
            flex:1,
            fontSize: theme.fonts.BODY.fontSize,
            color: theme.colors.PRIMARY,

        }
    })

    return (
        <View style={style.container}>
            <TextInput {...props} style={[props.style, style.textInput]} />
            {props.leadingItem}
        </View>
    )
}
