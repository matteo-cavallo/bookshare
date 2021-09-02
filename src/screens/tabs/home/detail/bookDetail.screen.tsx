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
import {ButtonComponent} from '../../../../components/button.component';
import {conditionMapper} from '../../../../utils/mappers/condition.mapper';
import {BookConditions} from '../../../../model/newBook.model';

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
            padding: theme.spacing.LG,
            alignItems: "center",
            justifyContent: "center"
            //borderRightWidth: 8,
            //borderRightColor: "#FFF"
        },
        title: {
            ...theme.fonts.TITLE,
            flexShrink: 1,
            flex: 1
        },
        subTitle: {
            ...theme.fonts.CAPTION,
            color: "#FFF",
        },
        price: {
            ...theme.fonts.TITLE,
            marginLeft: theme.spacing.S,
            color: "#FFF"
        },
        userSection: {
            flexDirection: "row",
            alignItems: "center",
            marginVertical: theme.spacing.LG
        },
        userImage: {
            margin: theme.spacing.LG,
            backgroundColor: theme.colors.FILL_TERTIARY,
            width: 50,
            height: 50,
            justifyContent:"center",
            alignItems: "center",
            borderRadius: 25
        },
        userContent: {
            flex: 1,
            flexShrink: 1
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
                               style={{height: '100%', aspectRatio: 3 / 4, borderRadius: theme.spacing.MD}}/>
                    </Center>
                </View>
                <View>

                    <View style={styles.titleContainer}>
                        <TextComponent style={styles.title}>{book?.title}</TextComponent>
                        <View style={{
                            width: 44,
                            height: 44,
                            backgroundColor: theme.colors.FILL_TERTIARY,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 22
                        }}>
                            <Ionicons name={"heart-outline"} size={24}/>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{marginBottom: theme.spacing.LG}}>
                        <TextComponent style={theme.fonts.HEADLINE}>€{book?.price}</TextComponent>
                    </View>


                    <View style={styles.section}>
                        <TextComponent style={theme.fonts.SECTION_HEADER}>Posizione del libro</TextComponent>
                        <TextComponent
                            style={[{color: theme.colors.ACCENT}, theme.fonts.HEADLINE]}>{book?.position?.address || "Nessuna posizione fornita"}</TextComponent>
                    </View>



                    <View style={styles.section}>
                        <View style={styles.userSection}>
                            <View style={styles.userImage}>
                                <Ionicons name={"person"} />
                            </View>
                            <View style={styles.userContent}>
                                <TextComponent style={theme.fonts.SUBHEADLINE}>Nome utente</TextComponent>
                                <ButtonComponent style={{marginTop: theme.spacing.MD}}>Contatta l'utente</ButtonComponent>
                            </View>
                        </View>
                    </View>


                    <View style={styles.section}>
                        <TextComponent style={theme.fonts.SECTION_HEADER}>Descrizione fornita
                            dall'utente</TextComponent>
                        <TextComponent>{book?.description || "Nessuna descrizione disponibile"}</TextComponent>
                    </View>

                    <View style={styles.section}>
                        <TextComponent style={theme.fonts.SECTION_HEADER}>Condizioni</TextComponent>
                        <TextComponent>{conditionMapper(book?.condition) || "Nessuna descrizione disponibile"}</TextComponent>
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
