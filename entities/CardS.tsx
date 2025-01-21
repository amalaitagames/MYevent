import {aYEvents, makeEventDto} from "./Yevents";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Event from "../assets/event.svg";
import Info from "../assets/info.svg";
import React from "react";
import colors from "../style/theme";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";

export default function CardS(yevent: aYEvents) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
            let eventDto = makeEventDto(yevent);
            navigation.navigate("Reservation", {
                label: eventDto.label,
                date: eventDto.date,
                image: eventDto.image,
                categorie: eventDto.categorie,
                description: eventDto.description,
                lieu: eventDto.lieu,
                id: eventDto.id,
                placesTotale: eventDto.placesTotale,
                placesRestantes: eventDto.placesRestantes
            });
        }}>
            <View style={cardStyle.cardContainer}>
                <View>
                    <Image source={{uri: yevent.image}} style={cardStyle.cardImage}></Image>
                    <View style={cardStyle.eventNameContainer}>
                        <Text style={cardStyle.eventName}>{yevent.label}</Text>
                    </View>
                </View>
                <View style={cardStyle.cardInfos}>
                    <View style={cardStyle.eventDate}>
                        <Event height={18} width={20}></Event>
                        <Text style={cardStyle.text}>{moment(yevent.date).format('ddd DD')}</Text>
                    </View>
                    <View style={cardStyle.eventInfo}>
                        <Info height={20} width={20}></Info>
                        <Text style={[cardStyle.text]}>+ infos</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const cardStyle = StyleSheet.create({
    cardContainer: {
        height: 150,
        width: 150,
        borderRadius: 24,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.white,
        alignItems: "center"

    },
    cardImage: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: 75,
        width: 148
    },
    eventNameContainer: {
        position: "absolute",
        bottom: -12,
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    eventName: {
        color: colors.darkGradientSecondeColor,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 24,
        fontSize: 12,
    },
    cardInfos: {
        width: '100%',
        height: '40%',
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: 15,
        gap: 5
    },
    text: {
        color: colors.white
    },
    eventDate: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        height: 20,
        gap: 5
    },
    eventInfo: {
        backgroundColor: colors.complementarySecond,
        borderRadius: 24,
        paddingVertical: 1,
        display: "flex",
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 10,
    },
    eventLabel: {
        backgroundColor: colors.white,
        borderRadius: 24,
        paddingHorizontal: 40,
        paddingVertical: 5,
        color: colors.primary,
        fontWeight: "bold",
    }
})