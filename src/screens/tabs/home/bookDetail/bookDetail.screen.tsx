import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthenticationNavigatorScreens} from '../../../../navigators/authentication.navigator';
import {HomeStackParams} from '../../../../navigators/home/home.navigator';
import {TextComponent} from '../../../../components/text.component';


type Props = NativeStackScreenProps<HomeStackParams, "BookPostDetail">

export const BookDetailScreen: FC<Props> = ({route,navigation}) => {

    const {bookId} = route.params

    return (
        <SafeAreaView>
            <TextComponent>{bookId}</TextComponent>
        </SafeAreaView>
    )
}
