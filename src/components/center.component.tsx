import React, {FC} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export const Center: FC<ViewProps> = (props) => {

    return (
        <View style={[props.style,style.container]}>
            {props.children}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})
