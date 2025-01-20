import React from "react";
import {aYEvents, makeEventDto} from "./Yevents";
import colors from "../style/theme";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Event from "../assets/event.svg";
import Info from "../assets/info.svg";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";


export default function CardXL(yevent: aYEvents) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
            let eventDto = makeEventDto(yevent);
            console.log("event", eventDto);
            navigation.navigate("Reservation", {
                label: eventDto.label,
                date: eventDto.date,
                image: eventDto.image,
                categorie: eventDto.categorie,
                description: eventDto.description,
                lieu: eventDto.lieu,
                id: eventDto.id,
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
                    <Text style={cardStyle.text}>{moment(yevent.date).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={cardStyle.eventInfo}>
                    <Info height={20} width={20}></Info>
                    <Text style={[cardStyle.text]}>+ infos</Text>
                </View>
                <Text style={cardStyle.eventLabel}>{yevent.type?.label}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const cardStyle = StyleSheet.create({
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
    eventNameContainer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        backgroundColor: colors.complementarySecond,
        paddingVertical: 5
    },
    eventName: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    cardInfos: {
        width: '100%',
        height: '40%',
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 5
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
        paddingVertical: 5,
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