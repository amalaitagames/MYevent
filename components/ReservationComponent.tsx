import React from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Event from "../assets/event.svg";
import {YeventDto} from "../entities/Yevents";
import colors from "../style/theme";
import {LinearGradient} from "expo-linear-gradient";
import MapView, {Marker} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";

export function getPlacesRestantesGommette(placesTotales: number, placesRestantes: number) {
    let plusDunTier = placesTotales * 0.4;
    let moinsDe10 = 10;
    if (placesRestantes > plusDunTier) {
        return <View style={[reservationStyle.gommetteVerte, reservationStyle.gommette]}></View>
    }
    if (placesRestantes > moinsDe10 && placesRestantes < plusDunTier) {
        return <View style={[reservationStyle.gommetteOrange, reservationStyle.gommette]}></View>
    }
    if (placesRestantes < moinsDe10) {
        return <View style={[reservationStyle.gommetteRouge, reservationStyle.gommette]}></View>
    }
}

export default function ReservationComponent({route}) {
    const navigation = useNavigation();
    let event: YeventDto = route.params;
    return (
        <LinearGradient
            style={reservationStyle.gradientInfoContainer}
            colors={[colors.primary, colors.darkGradientSecondeColor]}
            start={{x: 1, y: 0}}
            end={{x: 0.1, y: 0.5}}
        >
            <View style={reservationStyle.mainContainer}>
                <Text style={reservationStyle.titre}>Tout ce que tu dois savoir</Text>
                <View style={reservationStyle.infoMainContainer}>
                    <Text style={reservationStyle.eventLabel}>{event.label}</Text>
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

                    <View style={reservationStyle.lieuMainContainer}>
                        <View style={reservationStyle.lieuTextContainer}>
                            <Text style={reservationStyle.lieuLabel}>Lieu</Text>
                            <Text style={[reservationStyle.eventAdresseName]}>{event.lieu.label},</Text>
                            <Text style={reservationStyle.eventAdresse}>{event.lieu.adresse}</Text>
                        </View>
                        <MapView style={reservationStyle.mapView} initialRegion={{
                            latitude: event.lieu.latitude,
                            longitude: event.lieu.longitude,
                            latitudeDelta: 3,
                            longitudeDelta: 3
                        }}>
                            <Marker coordinate={{latitude: event.lieu.latitude, longitude: event.lieu.longitude}}/>
                        </MapView>
                    </View>

                    <View style={reservationStyle.descriptionMainContainer}>
                        <Text style={reservationStyle.descriptionLabel}>Description</Text>
                        <View style={reservationStyle.descriptionTextContainer}>
                            <ScrollView style={reservationStyle.eventDescriptionScrollContainer}>
                                <Text style={reservationStyle.eventDescription}>{event.description}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={reservationStyle.boutonContainer}>
                        <TouchableOpacity style={reservationStyle.boutonReserver}
                              onPress={() => {
                                  navigation.navigate('ReservationForm', {event})
                              }}><Text style={reservationStyle.boutonLabel}>RÉSERVER</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export const reservationStyle = StyleSheet.create({
    gradientInfoContainer: {
        height: '100%',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    mainContainer: {
        width: '100%',
        padding: 10,
        height: '100%',
        display: "flex",
        gap: 20
    },
    titre: {
        color: colors.white,
        fontSize: 16,
    },
    infoMainContainer: {
        display: 'flex',
        gap: 20
    },
    infoCard: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 24,
        display: "flex",
        flexDirection: "row",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: colors.primary,
        elevation: 10
    },
    infoCardImage: {
        height: 150,
        width: 177,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24
    },
    eventLabel: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.white,
    },
    infoCategorie: {
        color: colors.primary,
        backgroundColor: colors.white,
        width: 100,
        textAlign: "center",
        borderRadius: 24,
        fontWeight: "bold",
    },
    textInfos: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-around",
    },
    placeRestantesMainContainer: {
        display: "flex",
        alignItems: "center",
    },
    placeRestantesSubContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    placeRestantes: {
        color: colors.white
    },
    eventDateContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    eventDate: {
        color: colors.white
    },
    gommette: {
        borderRadius: "50%",
        width: 15,
        height: 15,
        borderWidth: 0.5,
        borderColor: colors.white,
        right: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    gommetteVerte: {
        backgroundColor: colors.green,
    },
    gommetteOrange: {
        backgroundColor: colors.complementarySecond,
    },
    gommetteRouge: {
        backgroundColor: colors.red,
    },
    lieuMainContainer: {
        display: "flex",
        flexDirection: "row",
    },
    lieuTextContainer: {
        display: "flex",
        width: "46%",
        gap: 10
    },
    lieuLabel: {
        color: colors.white,
        fontSize: 16,
    },
    eventAdresseName: {
color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    eventAdresse: {
        color: colors.white,
        fontStyle: 'italic',
        lineHeight: 25,
    },
    mapView: {
        height: 150,
        width: "54%",
    },
    descriptionMainContainer: {
        display: "flex",
        gap: 10
    },
    descriptionLabel: {
        color: colors.white,
        fontSize: 16,
    },
    descriptionTextContainer: {
        borderColor: colors.white,
        borderWidth: 1,
        width: "100%",
        borderRadius: 24,
        padding: 10,
        minHeight: 50,
        maxHeight: 300,
        height: 150,
    },
    eventDescriptionScrollContainer: {},
    eventDescription: {
        color: colors.white,
    },
    boutonContainer: {
        marginTop: 25,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    boutonReserver: {
        backgroundColor: colors.primary,
        width: "70%",
        height: 50,
        borderRadius: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.white,
    },
    boutonLabel: {
        color: colors.white,
        textAlign: "center",
        fontSize: 24,
    }

});