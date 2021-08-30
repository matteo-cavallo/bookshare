import {Image, StyleSheet, View} from 'react-native';
import React, {FC, useContext} from 'react';
import {BookPost} from '../../../../model/bookPost.model';
import {TextComponent} from '../../../../components/text.component';
import {ThemeContext} from '../../../../providers/theme.provider';
import {Center} from '../../../../components/center.component';

interface Props {
    post: BookPost
}

export const PostItemComponent: FC<Props> = ({post}) => {
    const {theme} = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            padding: theme.spacing.MD,
            flexDirection: "row",
            borderBottomColor: theme.colors.FILL_TERTIARY,
            borderBottomWidth: 1
        },
        imageContainer: {
            marginRight: theme.spacing.MD
        },
        imageStyle: {
            width: 80,
            aspectRatio: 3 / 4,
            borderRadius: theme.spacing.MD,
            resizeMode: "cover"
        },
        content: {
            flexShrink: 1,
            flex: 1
        },
        title: {
            ...theme.fonts.HEADLINE,
            marginBottom: theme.spacing.XS
        },
        price: {},
        positionText: {
            ...theme.fonts.CAPTION,
            textAlign: "right",
            marginBottom: theme.spacing.XS
        }
    })

    const renderImage = () => {
        return (
            post.mainImage
                ? <Image
                    source={{uri: post.mainImage || undefined}}
                    style={styles.imageStyle}
                />
                : <Center style={styles.imageStyle}>
                    <TextComponent>Book</TextComponent>
                </Center>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {renderImage()}
            </View>
            <View style={styles.content}>
                <TextComponent
                    style={styles.positionText}>{post.position?.name || "Nessuna posizione specificata"}</TextComponent>
                <TextComponent style={styles.title}>{post.title}</TextComponent>
                <TextComponent style={styles.price}>€{post.price}</TextComponent>
            </View>
        </View>
    )
}
