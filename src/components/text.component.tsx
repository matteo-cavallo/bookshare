import React, {FC, useContext} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {ThemeContext} from '../providers/theme.provider';

/**
 * This is our custom TextComponent.
 *  - It's BODY font by default.
 *  - It's Color is Primary by default.
 *  - It supports Dark Theme by default.
 *  - It behave like a react-native Text Component,
 *    so it can be used with all native props.
 *
 * @param props
 * @constructor
 */
export const TextComponent: FC<TextProps> = props => {

    const {theme} = useContext(ThemeContext)
    const style = StyleSheet.create({
        text: {
            color: theme.colors.PRIMARY,
        },
    })

    return <Text {...props} style={[theme.fonts.BODY, style.text, props.style]}>{props.children}</Text>
}
