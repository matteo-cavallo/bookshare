import React, {FC, useContext, useEffect} from 'react';
import {Center} from '../../../components/center.component';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {useDispatch, useSelector} from 'react-redux';
import {UIActions} from '../../../store/uiStore/uistore.actions';
import {useNavigation} from '@react-navigation/native'
import {ThemeContext} from '../../../providers/theme.provider';
import {AuthContext} from '../../../providers/auth.provider';
import {RootState} from '../../../store/store.config';
import {isLoaded, useFirebase, useFirestore, useFirestoreConnect} from 'react-redux-firebase';
import IsbnScanner from "../../../components/isbnScanner.component";
import {Ionicons} from "@expo/vector-icons";
import {Feed} from './components/feed.component';

export const HomeScreen: FC = () => {

    const {theme} = useContext(ThemeContext)

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        scrollView: {
            padding: theme.spacing.MD,
        },
    })

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <Feed />
            </ScrollView>
        </SafeAreaView>
    )
}
