import React, {FC, useContext} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {useNavigation} from '@react-navigation/native'
import {ThemeContext} from '../../../providers/theme.provider';
import {Ionicons} from '@expo/vector-icons';
import {RootState, useAppSelector} from '../../../store/store.config';
import {FBAuth} from '../../../firebase/firebase.config';

export const ProfileScreen: FC = () => {

    const navigation = useNavigation()

    // Context
    const {theme} = useContext(ThemeContext)

    // Selectors
    const auth = useAppSelector(state => state.auth.user)
    const profile = useAppSelector(state => state.user.user)

    function handleLogout(){
        FBAuth.signOut().then(() => {
            console.log("User is signed out.")
        })
    }

    const styles = StyleSheet.create({
        header: {
            flex:1,
            flexDirection: "row",
            paddingHorizontal: theme.spacing.XL,
            alignItems: "center",
            justifyContent: "flex-end",
        },
        textHeader:{
            ...theme.fonts.LARGE_TITLE,
            marginHorizontal: theme.spacing.MD
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#555",
            marginBottom: theme.spacing.LG,
        },
        body: {
            padding: theme.spacing.LG
        }
    })

    const getHeaderText = () =>{
        if(profile?.firstName && profile.lastName){
            return (
                <TextComponent style={styles.textHeader}>{`${profile.firstName} ${profile.lastName}`}</TextComponent>
            )
        }

        return (
            <TextComponent style={styles.textHeader}>Profile</TextComponent>
        )
    }

    return (
        <ScrollView>
            <SafeAreaView>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>{}}>
                            <Ionicons name={"person-circle-outline"} color={theme.colors.ACCENT} size={theme.icons.XL}/>
                        </TouchableOpacity>
                    </View>
                    {getHeaderText()}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}