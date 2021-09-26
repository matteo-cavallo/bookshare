import React, {FC, ReactElement, useContext, useEffect, useState} from 'react';
import {Center} from '../../../components/center.component';
import {
    ActivityIndicator,
    Button, FlatList, ListRenderItemInfo,
    RefreshControl,
    RefreshControlProps,
    SafeAreaView,
    ScrollView, SectionList,
    StyleSheet,
    Text, TouchableHighlight, TouchableOpacity,
    View
} from 'react-native';
import {TextComponent} from '../../../components/text.component';
import {ThemeContext} from '../../../providers/theme.provider';
import {useAppDispatch, useAppSelector} from '../../../store/store.config';
import {HomeActions} from '../../../store/home/home.actions';
import {SectionComponent} from './components/section.component';
import {Post} from 'model/post.model';
import {PostItemComponent} from './components/postItem.component';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {HomeStack} from '../../../navigators/home/home.navigator';
import {TextInputComponent} from '../../../components/textInput.component';
import {Ionicons} from '@expo/vector-icons';

type Props = NativeStackScreenProps<HomeStack, "Home">

export const HomeScreen: FC<Props> = ({navigation}) => {

    const {theme} = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    //const [order, setOrder] = useState<OrderByDirection>("desc")
    const [orderBy, setOrderBy] = useState<keyof Post>("creationDate")
    const [searchText, setSearchText] = useState("")

    /*const {data, getMoreData, fetchFirstBatch, loadingMoreItems, loading} = usePaginatedData<Post>(FBCollections.bookPost, orderBy, {
        direction: order,
        firstBatch: 6,
        moreDataBatch: 4,
    })*/

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        scrollView: {
            padding: theme.spacing.MD,
        },
    })

    const renderItem = (props: ListRenderItemInfo<Post>) => {
        const {item, index, separators} = props

        return <PostItemComponent key={index}
                                  post={item}
                                  navigateTo={handleNavigateToDetails}
        />
    }

    function handleNavigateToDetails(uid: string){
        navigation.navigate("BookDetail", {
            uid
        })
    }


/*    const listFooterComponent: FC = () => (
        loadingMoreItems ? <ActivityIndicator/> : null
    )*/

    const listSeprator:FC = () => (
        <View style={{height: 1, backgroundColor: theme.colors.FILL_TERTIARY}}/>
    )

    const SearchBar: FC = () => (
                <TextInputComponent
                    placeholder={"Cerca"}
                    startItem={<Ionicons name={"search"} size={17} color={theme.colors.SECONDARY}/>}
                    style={{
                    }}
                    containerStyle={{
                        marginTop: theme.spacing.S
                    }}
                />
    )


    const listHeader: FC = () => (
            <View style={{padding: theme.spacing.LG}}>
                <TextComponent style={theme.fonts.TITLE}>Feed</TextComponent>
            </View>
    )


    return (
        <SafeAreaView style={styles.safeArea}>
{/*            <FlatList data={data}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => item.uid || index.toString()}
                      refreshControl={<RefreshControl refreshing={loading}
                                                      onRefresh={() => fetchFirstBatch()}/>}
                      onEndReachedThreshold={0}
                      onEndReached={getMoreData}
                      ListFooterComponent={listFooterComponent}
                      ItemSeparatorComponent={listSeprator}
                      ListHeaderComponent={listHeader}
            />*/}
        </SafeAreaView>
    )
}
