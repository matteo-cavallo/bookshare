import React, {FC, useContext, } from 'react';
import {Post} from 'model/post.model';
import {StyleSheet, View} from 'react-native';
import {TextComponent} from '../../../../components/text.component';
import {ThemeContext} from '../../../../providers/theme.provider';
import {PostItemComponent} from './postItem.component';

interface Props {
    title: string
    items: Post[]
}

export const SectionComponent: FC<Props> = (props) => {
    const {items, title} = props

    const {theme} = useContext(ThemeContext)


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
            </View>
            <View style={styles.body}>
                {
                    items.map(post => <PostItemComponent key={post.uid} post={post} navigateTo={()=>{}}/>)
                }
            </View>
        </View>
    )
}
