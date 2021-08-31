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
            flex: 1,
            backgroundColor: "#FFF"
        },
        scrollView: {},
        navBar: {
            padding: theme.spacing.MD,
            flexDirection: "row-reverse"
        },
        header: {
            minHeight: 300,
            paddingBottom: theme.spacing.LG,
        },
        content: {
            paddingHorizontal: theme.spacing.LG
        },
        section: {
            marginBottom: theme.spacing.MD
        },
        titleContainer: {
            flexDirection: "row",
            marginBottom: theme.spacing.LG,
            backgroundColor: theme.colors.ACCENT,
            padding: theme.spacing.LG,
            alignItems: "center",
            //borderRightWidth: 8,
            //borderRightColor: "#FFF"
        },
        title: {
            ...theme.fonts.SUBHEADLINE,
            color: "#FFF",
        },
        subTitle: {
            ...theme.fonts.CAPTION,
            color: "#FFF",
        },
        price: {
            ...theme.fonts.TITLE,
            marginLeft: theme.spacing.S,
            color: "#FFF"
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
                <View style={styles.titleContainer}>
                    <View style={{flex: 1, flexShrink: 1}}>
                        <TextComponent style={styles.title}>{book?.title}</TextComponent>
                        <TextComponent style={styles.subTitle}>{book?.position?.name}</TextComponent>
                    </View>
                    <TextComponent style={styles.price}>{book?.price} €</TextComponent>
                </View>
                <View style={styles.content}>
                    <View style={styles.section}>
                        <TextComponent style={theme.fonts.SECTION_HEADER}>Descrizione</TextComponent>
                        <TextComponent>{book?.description || "Nessuna descrizione disponibile"}</TextComponent>
                    </View>

                    <View style={styles.section}>
                        <TextComponent style={theme.fonts.SECTION_HEADER}>Condizioni</TextComponent>
                        <TextComponent>{book?.condition || "Nessuna descrizione disponibile"}</TextComponent>
                    </View>

                    <View style={styles.section}>
                        <TextComponent style={theme.fonts.SECTION_HEADER}>CONTATTI</TextComponent>
                        <TextComponent>{book?.phoneNumber?.number || "Nessun numero fornito"}</TextComponent>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
