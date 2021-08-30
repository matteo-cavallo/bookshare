import React, {FC, useContext, useEffect} from 'react';
import {Center} from '../../../components/center.component';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {ThemeContext} from '../../../providers/theme.provider';
import {useAppDispatch, useAppSelector} from '../../../store/store.config';
import {HomeActions} from '../../../store/home/home.actions';
import {SectionComponent} from './components/section.component';

export const HomeScreen: FC = () => {

    const {theme} = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    const items = useAppSelector(state => state.home.feed)

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
                <SectionComponent title={"Feed"} items={items} />
            </ScrollView>
        </SafeAreaView>
    )
}
