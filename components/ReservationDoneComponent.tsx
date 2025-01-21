import React from "react";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {getPlacesRestantesGommette, reservationStyle} from "./ReservationComponent";
import colors from "../style/theme";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Event from "../assets/event.svg";
import {styles} from "../style/shared-styles";
import Home from "../assets/home_rounded_white.svg"
export default function ReservationDoneComponent({route}) {
    const navigation = useNavigation();
    let event = route.params.event;
    return (
        <LinearGradient
            style={styles.gradient_container}
            colors={[colors.primary, colors.darkGradientSecondeColor]}
            start={{x: 1, y: 0}}
            end={{x: 0.1, y: 0.5}}
        >
            <View style={reservationStyle.mainContainer}>
                <Text style={reservationStyle.titre}>Merci pour ta réservation</Text>
                <View style={reservationStyle.infoMainContainer}>
                    <Text style={reservationStyle.eventLabel}>Bravo tu as réservé ta place !</Text>
                    <LinearGradient
                        colors={[colors.primary, colors.darkGradientSecondeColor]}
                        start={{x: 1, y: 0.2}}
                        end={{x: 0.2, y: 0.7}}
                        style={reservationStyle.infoCard}>
                        <Image source={{uri: event.image}} style={reservationStyle.infoCardImage}></Image>
                        <View style={reservationStyle.textInfos}>
                            <Text style={reservationStyle.infoCategorie}>{event.categorie}</Text>
                            <View style={reservationStyle.placeRestantesMainContainer}>
                                <View style={reservationStyle.placeRestantesSubContainer}>
                                    {getPlacesRestantesGommette(event.placesTotale, event.placesRestantes)}
                                    <Text style={reservationStyle.placeRestantes}>{event.placesRestantes}</Text>
                                </View>
                                <Text style={reservationStyle.placeRestantes}>places restantes</Text>
                            </View>
                            <View style={reservationStyle.eventDateContainer}>
                                <Event height={18} width={20}></Event>
                                <Text style={reservationStyle.eventDate}>{event.date}</Text>
                            </View>
                        </View>
                    </LinearGradient>


                    <View style={reservationStyle.boutonContainer}>
                        <TouchableOpacity style={[reservationStyle.boutonReserver, reservationReussie.boutonRetour]}
                              onPress={() => {
                                  navigation.navigate('Home')
                              }}>
                            <Home height={30} width={30}></Home>
                            <Text style={reservationStyle.boutonLabel}>Retour au Menu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}
const reservationReussie = StyleSheet.create({
    boutonRetour: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    }
})