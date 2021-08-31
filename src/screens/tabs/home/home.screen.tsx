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
import {BookPost} from '../../../model/bookPost.model';
import {PostItemComponent} from './components/postItem.component';

export const HomeScreen: FC = () => {

    const {theme} = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    const items = useAppSelector(state => state.home.feed)
    const refreshing = useAppSelector(state => state.home.isLoading)
    const isLoadingMoreItems = useAppSelector(state => state.home.isLoadingMoreData)

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        scrollView: {
            padding: theme.spacing.MD,
        },
    })

    useEffect(() => {
        dispatch(HomeActions.fetchFeed())
    }, [])

    const renderItem = (props: ListRenderItemInfo<BookPost>) => {
        const {item, index, separators} = props

        return <PostItemComponent key={index} post={item}/>
    }

    function handleFetchMoreData() {
        if (!isLoadingMoreItems) {
            dispatch(HomeActions.fetchMoreDataFeed())
        }
    }

    const listFooterComponent: FC = () => (
        isLoadingMoreItems ? <ActivityIndicator/> : null
    )

    const listSeprator:FC = () => (
        <View style={{height: 1, backgroundColor: theme.colors.FILL_TERTIARY}}/>
    )

    const listHeader: FC = () => (
            <View style={{padding: theme.spacing.LG}}>
                <TextComponent style={theme.fonts.TITLE}>Feed</TextComponent>
            </View>
    )


    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList data={items}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => item.uid || index.toString()}
                      refreshControl={<RefreshControl refreshing={refreshing}
                                                      onRefresh={() => dispatch(HomeActions.fetchFeed())}/>}
                      onEndReachedThreshold={0}
                      onEndReached={handleFetchMoreData}
                      ListFooterComponent={listFooterComponent}
                      ItemSeparatorComponent={listSeprator}
                      ListHeaderComponent={listHeader}
            />
        </SafeAreaView>
    )
}
