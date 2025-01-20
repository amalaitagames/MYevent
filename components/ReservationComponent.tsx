import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import Event from "../assets/event.svg";
import {YeventDto} from "../entities/Yevents";
import colors from "../style/theme";
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../style/shared-styles";

export default function ReservationComponent({route}) {
    let event: YeventDto = route.params;
    return (
        <LinearGradient
            style={styles.gradient_container}
            colors={[colors.primary, colors.darkGradientSecondeColor]}
            start={{x: 1, y: 0}}
            end={{x: 0.1, y: 0.5}}
        >
            <View>
                <Text style={reservationStyle.titre}>Tout ce que tu dois savoir</Text>
                <View style={reservationStyle.infoMainContainer}>
                    <Text style={reservationStyle.eventLabel}>{event.label}</Text>
                    <View>
                        <Image></Image>
                        <View>
                            <Text>{event.categorie}</Text>
                            <Text>{event.placesRestantes} places restantes</Text>
                            <View style={reservationStyle.eventDateContainer}>
                                <Event height={18} width={20}></Event>
                                <Text style={reservationStyle.eventDate}>{event.date}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text>Reservation component</Text>
                <Text>label: {event.label}</Text>
                <Text>type: {event.categorie}</Text>
                <Text>date: {event.date}</Text>
            </View>
        </LinearGradient>
        )
}

const reservationStyle = StyleSheet.create({
    titre: {
      color: colors.white,
        fontSize: 16,
    },
    infoMainContainer: {

    },
    eventLabel: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.white,
    },
    eventDateContainer: {

    },
    eventDate: {
        color: colors.primary
    }
});