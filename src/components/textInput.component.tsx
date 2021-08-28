import React, {FC, useContext} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {ThemeContext} from '../providers/theme.provider';

interface TextInputComponentProps extends TextInputProps {
    endItem?: JSX.Element,
    startItem?: JSX.Element
}

export const TextInputComponent: FC<TextInputComponentProps> = (props) => {

    const {theme} = useContext(ThemeContext)

    const style = StyleSheet.create({
        container: {
            flexDirection: "row",
            backgroundColor: theme.colors.FILL_TERTIARY,
            borderRadius: theme.spacing.LG,
            marginBottom: theme.spacing.MD,
        },
        textInput: {
            flex:1,
            fontSize: theme.fonts.BODY.fontSize,
            color: theme.colors.PRIMARY,
            padding: theme.spacing.LG,
        },
        endItem:{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: theme.spacing.MD
        },
        startItem:{
            marginLeft: theme.spacing.MD,
            alignItems: 'center',
            justifyContent: 'center',
        }
    })

    return (
        <View style={style.container}>
            {props.startItem && <View style={style.startItem}>
                {props.startItem}
            </View>}
            <TextInput {...props} style={[props.style, style.textInput]} />
            {
             props.endItem &&   <View style={style.endItem}>
                    {props.endItem}
                </View>
            }
        </View>
    )
}
