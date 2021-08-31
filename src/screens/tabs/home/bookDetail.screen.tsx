import React, {FC, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStackParams} from '../../../navigators/home/home.navigator';

type Props = NativeStackScreenProps<HomeStackParams, "BookDetail">

export const BookDetail: FC<Props> = ({navigation, route}) => {

    const {uid} = route.params

    useEffect(() => {

    },[uid])

    return (
        <SafeAreaView>
            <TextComponent></TextComponent>
        </SafeAreaView>
    )
}
