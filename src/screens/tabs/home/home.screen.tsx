import React, {FC, useContext, useEffect} from 'react';
import {Center} from '../../../components/center.component';
import {Button, SafeAreaView, Text} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {useDispatch, useSelector} from 'react-redux';
import {UIActions} from '../../../store/uiStore/uistore.actions';
import {useNavigation} from '@react-navigation/native'
import {ThemeContext} from '../../../providers/theme.provider';
import {AuthContext} from '../../../providers/auth.provider';
import { RootState} from '../../../store/store.config';
import {isLoaded, useFirebase, useFirestore, useFirestoreConnect} from 'react-redux-firebase';
import IsbnScanner from "../../../components/isbnScanner.component";
import {Ionicons} from "@expo/vector-icons";

export const HomeScreen: FC = () => {

    const navigation = useNavigation()

    const {theme} = useContext(ThemeContext)

    const email  = useSelector((state: RootState) => state.firebase.auth.email)
    const profile = useSelector((state: RootState) => state.firebase.profile)


    const auth = useSelector((state: RootState) => state.firebase.auth)

    return (
        <SafeAreaView>
            <TextComponent>ciao</TextComponent>
        </SafeAreaView>
    )
}
