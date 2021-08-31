import React, {FC, useContext, useEffect} from 'react';
import {ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParams} from '../../../navigators/home/home.navigator';
import {useAppDispatch, useAppSelector} from '../../../store/store.config';
import {Center} from '../../../components/center.component';
import {BookDetailActions} from '../../../store/bookDetail/bookDetail.actions';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../../../providers/theme.provider';
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
    },[uid])


    const styles = StyleSheet.create({
        container: {
            padding: theme.spacing.LG
        }
    })

    if(isLoading){
        return(
            <Center>
                <ActivityIndicator />
            </Center>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                    <Ionicons name={"close-circle"} size={theme.icons.LG} />
                </TouchableOpacity>
                <Image source={{uri: book?.mainImage || undefined}} style={{width: '100%', aspectRatio: 4/3}}/>
            <TextComponent style={theme.fonts.LARGE_TITLE}>{book?.title}</TextComponent>
            </ScrollView>
        </SafeAreaView>
    )
}
