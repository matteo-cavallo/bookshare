import React, {FC, useContext} from 'react';

import {
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {TextComponent} from "../../../components/text.component";
import {ThemeContext} from "../../../providers/theme.provider";
import {genericConverter, usePaginatedData} from '../../../hooks/usePaginatedData.hook';
import {Chat} from "../../../model/chats.model";
import {FBFirestore, OrderByDirection} from '../../../firebase/firebase.config';
import {useAppSelector} from '../../../store/store.config';

export const ChatsScreen = () => {

    const {theme} = useContext(ThemeContext)

    const user = useAppSelector(state => state.user.user)

    const chatList = usePaginatedData<Chat>("chats","lastUpdate",{
        direction: "asc",
        firstBatch: 10,
        moreDataBatch: 5,
        customFetch: ({collection,fetchThen,orderByDefault,direction,withConvertedDefault,firstBatch}) => {
            const uid = user?.uid ? user.uid : ""
            console.log("UID::",uid)
            FBFirestore.collection(collection)
                .withConverter(withConvertedDefault<Chat>())
                .orderBy(orderByDefault, direction)
                .limit(firstBatch)
                .get()
                .then(fetchThen)
                .catch(e => {
                    console.log("Error fetch paginated data: ", e)
                })
        }
    })


    const styles = StyleSheet.create({
        textHeader:{
            ...theme.fonts.LARGE_TITLE,
            marginVertical: theme.spacing.LG,
            marginHorizontal: theme.spacing.MD
        },
    })

    const renderChatItem = (item: ListRenderItemInfo<Chat>) =>{
        return <TextComponent key={item.item.uid} >{`${item.item.user} - ${item.item.seller}`}</TextComponent>
    }

    const listHeader: FC = () => (
        <View style={styles.textHeader}>
            <TextComponent style={theme.fonts.TITLE}>Feed</TextComponent>
        </View>
    )

    const listFooterComponent: FC = () => (
        chatList.loadingMoreItems ? <ActivityIndicator/> : null
    )

    const listSeprator:FC = () => (
        <View style={{height: 1, backgroundColor: theme.colors.FILL_TERTIARY}}/>
    )


    return (

                <SafeAreaView style={{flex:1}}>
                        <FlatList data={chatList.data} renderItem={renderChatItem}
                                  keyExtractor={(item, index) => item.uid || index.toString()}
                                  refreshControl={<RefreshControl refreshing={chatList.loading}
                                                                  onRefresh={() => chatList.fetchFirstBatch()}/>}
                                  onEndReachedThreshold={0}
                                  onEndReached={chatList.getMoreData}
                                  ListFooterComponent={listFooterComponent}
                                  ItemSeparatorComponent={listSeprator}
                                  ListHeaderComponent={listHeader}
                        />

                </SafeAreaView>
    );
};

