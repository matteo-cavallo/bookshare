import React, {FC, useContext, useEffect} from 'react';
import {Center} from '../../../components/center.component';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {ThemeContext} from '../../../providers/theme.provider';
import {useAppDispatch} from '../../../store/store.config';
import {HomeActions} from '../../../store/home/home.actions';

export const HomeScreen: FC = () => {

    const {theme} = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        scrollView: {
            padding: theme.spacing.MD,
        },
    })

    useEffect(() => {
        dispatch(HomeActions.fetchFeed())
    },[])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <TextComponent>Home boy</TextComponent>
            </ScrollView>
        </SafeAreaView>
    )
}
