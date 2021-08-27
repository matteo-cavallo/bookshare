import React, {FC, useContext} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import RNPickerSelect, {PickerSelectProps} from "react-native-picker-select";
import {ThemeContext} from "../providers/theme.provider";
import {Ionicons} from "@expo/vector-icons";

interface PickerSelectorProps extends PickerSelectProps {

}

export const PickerSelector:FC<PickerSelectorProps> = (props) => {

    const {theme} = useContext(ThemeContext);

    const style = StyleSheet.create({
        container:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.LG,
            backgroundColor: theme.colors.FILL_TERTIARY,
            borderRadius: theme.spacing.LG,
            marginBottom: theme.spacing.MD
        },
        input: {
            flex:1,
            fontSize: theme.fonts.BODY.fontSize,
            color: theme.colors.PRIMARY,
        },
        rnPickerSelect:{
            flex: 1,
            flexDirection: 'row',
        }
    })

    return (
        <View style={style.container}>
            <RNPickerSelect
                style={{inputIOS:style.input,inputAndroid:style.input,...style.rnPickerSelect,viewContainer:style.rnPickerSelect}}
                {...props}
            />
            <Ionicons name={"chevron-down-outline"} size={theme.spacing.LG} color={theme.colors.SECONDARY}/>
        </View>
    );
};

