import React, {useContext} from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextComponent} from "../../../components/text.component";
import {ThemeContext} from "../../../providers/theme.provider";
import {usePaginatedData} from "../../../hooks/usePaginatedData.hook";
import {Chat} from "../../../model/chats.model";
import {OrderByDirection} from "../../../firebase/firebase.config";

export const ChatsScreen = () => {

    const {theme} = useContext(ThemeContext)

    //const chatsList = usePaginatedData<Chat>("chats")


    const styles = StyleSheet.create({
        textHeader:{
            ...theme.fonts.LARGE_TITLE,
            marginVertical: theme.spacing.LG,
            marginHorizontal: theme.spacing.MD
        },
    })

    return (

            <ScrollView>
                <SafeAreaView>
                    <TextComponent style={styles.textHeader}>Chats</TextComponent>
                    <View>


                    </View>

                </SafeAreaView>
            </ScrollView>
    );
};

