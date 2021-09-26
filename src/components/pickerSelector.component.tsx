import React, {FC, useContext} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import RNPickerSelect, {PickerSelectProps, PickerStyle} from "react-native-picker-select";
import {ThemeContext} from "providers/theme.provider";
import {Ionicons} from "@expo/vector-icons";

export const PickerSelector: FC<PickerSelectProps> = (props) => {

    const {theme} = useContext(ThemeContext);


    const iconStyle: StyleProp<TextStyle> = {
        color: theme.colors.PRIMARY
    }

    const pickerStyle: PickerStyle = {
        placeholder: {
            fontSize: 17,
            color: theme.colors.SECONDARY
        },
        inputIOS: {
            fontSize: 17,
            color: theme.colors.PRIMARY
        },
        inputAndroid: {
            fontSize: 17,
            color: theme.colors.PRIMARY
        }
    }

    const touchableStyle: StyleProp<ViewStyle> = {
        paddingHorizontal: theme.spacing.MD,
        paddingVertical: theme.spacing.LG,
        backgroundColor: theme.colors.FILL_TERTIARY,
        borderRadius: theme.spacing.LG,
        marginBottom: theme.spacing.MD,
    }

    const pickerIcon = () => {
        return <Ionicons name={"chevron-forward"} style={iconStyle} size={17}/>
    }

    return (
        <RNPickerSelect {...props}
                        style={pickerStyle}
                        Icon={pickerIcon}
                        touchableWrapperProps={{style: touchableStyle}}
                        doneText={"Fatto"}
        />
    )
};

