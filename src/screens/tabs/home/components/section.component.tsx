import React, {FC, useContext, useEffect} from 'react';
import {BookPost} from '../../../../model/bookPost.model';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {TextComponent} from '../../../../components/text.component';
import {ThemeContext} from '../../../../providers/theme.provider';
import {PostItemComponent} from './postItem.component';
import {useAppSelector} from '../../../../store/store.config';

interface Props {
    title: string
    items: BookPost[]
}

export const SectionComponent: FC<Props> = (props) => {
    const {items, title} = props

    const {theme} = useContext(ThemeContext)

    const isLoading = useAppSelector(state => state.home.isLoading)

    const styles = StyleSheet.create({
        section: {},
        header: {
            flexDirection: "row"
        },
        title: {
            ...theme.fonts.TITLE,
            marginRight: theme.spacing.MD
        },
        body: {}
    })

    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <TextComponent style={styles.title}>{title}</TextComponent>
                {
                    isLoading && <ActivityIndicator/>
                }
            </View>
            <View style={styles.body}>
                {
                    items.map(post => <PostItemComponent key={post.uid} post={post}/>)
                }
            </View>
        </View>
    )
}
