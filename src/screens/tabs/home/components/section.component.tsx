import React, {FC, useContext, useEffect} from 'react';
import {BookPost} from '../../../../model/bookPost.model';
import {StyleSheet, Text, View} from 'react-native';
import {TextComponent} from '../../../../components/text.component';
import {ThemeContext} from '../../../../providers/theme.provider';

interface Props {
    title: string
    items: BookPost[]
}
export const SectionComponent: FC<Props> = (props) => {
    const {items, title} = props

    const {theme} = useContext(ThemeContext)

    const styles = StyleSheet.create({
        section: {

        },
        title: {
            ...theme.fonts.TITLE
        },
        body: {

        }
    })

    return (
        <View style={styles.section}>
            <TextComponent style={styles.title}>{title}</TextComponent>
            <View style={styles.body}>
                {
                    items.map( post => <Text key={post.uid}>{post.title}</Text>)
                }
            </View>
        </View>
    )
}
