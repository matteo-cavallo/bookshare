import React, {FC, } from 'react';
import {StyleSheet, View} from 'react-native';
import {Center} from '../../components/center.component';
import { LightColors} from '../../styles/colors';
import {LightTheme} from '../../styles/theme';
import {TextComponent} from '../../components/text.component';

export const SplashScreen: FC = () => {

    return (
        <View style={styles.container}>
            <Center>
                <TextComponent style={[LightTheme.fonts.LARGE_TITLE,{color: "#FFFFFF"}]}>Bookshare</TextComponent>
            </Center>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LightColors.ACCENT
    }
})
