import React, {FC, useContext} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View
} from 'react-native';
import {ThemeContext} from 'providers/theme.provider';
import {TextComponent} from "./text.component";
import {Ionicons} from "@expo/vector-icons";

interface NavigationLinkComponentProps extends TouchableOpacityProps {
    endItem?: JSX.Element,
    startItem?: JSX.Element
}

export const NavigationLinkComponent: FC<NavigationLinkComponentProps> = (props) => {


    const {theme} = useContext(ThemeContext)

    const {endItem = <Ionicons name={"chevron-forward"} size={theme.icons.XS} color={theme.colors.PRIMARY} />} = props

    const style = StyleSheet.create({
        container: {
            flexDirection: "row",
            backgroundColor: theme.colors.FILL_TERTIARY,
            borderRadius: theme.spacing.LG,
            marginBottom: theme.spacing.MD,
            paddingHorizontal: theme.spacing.LG,
            paddingVertical: theme.spacing.LG,
        },
        text: {
            flex:1,
            fontSize: theme.fonts.BODY.fontSize,
            color: theme.colors.PRIMARY,
        },
        endItem:{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: theme.spacing.MD
        },
        startItem:{
            marginRight: theme.spacing.MD,
            alignItems: 'center',
            justifyContent: 'center',
        }
    })

    return (
        <TouchableOpacity style={style.container}>
            {props.startItem && <View style={style.startItem}>
                {props.startItem}
            </View>}
            <TextComponent {...props} style={[style.text,props.style]} />
            {
                endItem && <View style={style.endItem}>
                    {endItem}
                </View>
            }
        </TouchableOpacity>
    )
}
