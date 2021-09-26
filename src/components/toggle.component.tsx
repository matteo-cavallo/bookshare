import React, {FC, useContext} from 'react';
import {StyleSheet, Switch, SwitchProps, View} from 'react-native';
import {TextComponent} from './text.component';
import {ThemeContext} from 'providers/theme.provider';


interface Props extends SwitchProps {
    text: string
}
export const ToggleComponent: FC<Props> = (props) => {

    const {theme} = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            backgroundColor: theme.colors.FILL_TERTIARY,
            paddingHorizontal: theme.spacing.LG,
            paddingVertical: theme.spacing.MD,
            borderRadius: theme.spacing.LG,
        },
        text: {
          flexShrink: 1
        },
        switch:{
            marginStart: theme.spacing.MD
        }
    })
    return (
        <View style={styles.container}>
            <TextComponent style={styles.text}>{props.text}</TextComponent>
            <Switch style={styles.switch} {...props}/>
        </View>
    )
}
