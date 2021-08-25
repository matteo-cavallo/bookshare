import React, {FC, useContext} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {ThemeContext} from '../providers/theme.provider';

interface Props extends TextInputProps {

}

export const TextInputComponent: FC<TextInputProps> = (props) => {

    const {theme} = useContext(ThemeContext)

    const style = StyleSheet.create({
        container: {
          padding: theme.spacing.S,
        },
        textInput: {
            fontSize: theme.fonts.BODY.fontSize,
            color: theme.colors.PRIMARY
        }
    })

    return (
        <View style={style.container}>
            <TextInput style={[props.style, style.textInput]} {...props} />
        </View>
    )
}
