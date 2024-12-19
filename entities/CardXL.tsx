import React from "react";
import { aYEvents } from "./Yevents";
import colors from "../style/theme";
import { View, Image, Text, StyleSheet } from "react-native";
export default function CardXL(yevent: aYEvents) {
    return (
        <View style={scrollStyle.cardContainer}>
            <Image source={{ uri: yevent.image }} style={scrollStyle.cardImage}></Image>
            <View style={scrollStyle.cardInfos}>
                <View>
                    <Text>14/07/2025</Text>
                </View>
                <View>
                    <Text>+ infos</Text>
                </View>
                <Text>{yevent.label}</Text>
            </View>
        </View>
    )
}

const scrollStyle = StyleSheet.create({
    cardContainer: {
        height: 300,
        width: 170,
        borderRadius: 24,
        backgroundColor: colors.primaryTransparent,
        borderWidth: 1,
        borderColor: colors.white,
        alignItems: "center"

    },
    cardImage: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: 168,
        width: 168
    },
    cardInfos: {
        width: '100%',
        alignItems: "center"
    }
})