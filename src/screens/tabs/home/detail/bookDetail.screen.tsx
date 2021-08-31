import React, {FC, useContext, useEffect} from 'react';
import {ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponent} from '../../../../components/text.component';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParams} from '../../../../navigators/home/home.navigator';
import {useAppDispatch, useAppSelector} from '../../../../store/store.config';
import {Center} from '../../../../components/center.component';
import {BookDetailActions} from '../../../../store/bookDetail/bookDetail.actions';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../../../../providers/theme.provider';
import {Ionicons} from '@expo/vector-icons';

type Props = NativeStackScreenProps<HomeStackParams, "BookDetail">

export const BookDetail: FC<Props> = ({navigation, route}) => {

    const {uid} = route.params

    const {theme} = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    const book = useAppSelector(state => state.bookDetail.book)
    const isLoading = useAppSelector(state => state.bookDetail.isLoading)

    useEffect(() => {
        dispatch(BookDetailActions.fetchBook({uid}))
    }, [uid])


    const styles = StyleSheet.create({
        container: {
            padding: theme.spacing.LG,
            flex: 1
        },
        scrollView: {},
        navBar: {
            padding: theme.spacing.MD,
            flexDirection: "row-reverse"
        },
        header: {
            minHeight: 300,
            backgroundColor: theme.colors.FILL_TERTIARY,
            paddingBottom: theme.spacing.LG
        },
        content: {
            padding: theme.spacing.LG
        },
        titleContainer:{
            flexDirection: "row",

        },
        title:{
            ...theme.fonts.HEADLINE,
            flex: 1,
            flexShrink: 1
        },
        price: {
            ...theme.fonts.HEADLINE,
            marginLeft: theme.spacing.MD
        }
    })

    if (isLoading) {
        return (
            <Center>
                <ActivityIndicator/>
            </Center>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <View style={styles.navBar}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Ionicons name={"close-circle"} size={theme.icons.LG}/>
                        </TouchableOpacity>
                    </View>
                    <Center>
                        <Image source={{uri: book?.mainImage || undefined}}
                               style={{height: '100%', aspectRatio: 3 / 4}}/>
                    </Center>
                </View>
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                    <TextComponent style={styles.title}>{book?.title}</TextComponent>
                    <TextComponent style={styles.price}>€{book?.price}</TextComponent>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
