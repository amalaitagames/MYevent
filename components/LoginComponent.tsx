import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {reservationStyle} from "./ReservationComponent";
import colors from "../style/theme";
import {useNavigation} from "@react-navigation/native";
import InscriptionForm from "./InscriptionForm";
import LoginFormComponent from "./LoginFormComponent";
import {EventRegister} from "react-native-event-listeners";


export default function LoginComponent() {
    const navigation = useNavigation();
    const [isInscription, setInscription] = useState(false);
    useEffect(() => {
        EventRegister.addEventListener('isInscriptionChange', (data) => {
            setInscription(data);
        });
        EventRegister.addEventListener('utilisateur', data => {
            navigation.navigate("Home", {utilisateur: data});
        })
    });

    return (
        <LinearGradient
            style={reservationStyle.gradientInfoContainer}
            colors={[colors.primary, colors.darkGradientSecondeColor]}
            start={{x: 0.1, y: 0.9}}
            end={{x: 0, y: 0}}>
            <View style={connexionStyle.mainContainer}>
                <View style={connexionStyle.titleContainer}>
                    <Text style={connexionStyle.title}>MYevent</Text>
                    <Text style={connexionStyle.titleLabel}>Réservation de billets en ligne</Text>
                </View>
                <View style={connexionStyle.formContainer}>
                    {isInscription ? <InscriptionForm></InscriptionForm> : <LoginFormComponent></LoginFormComponent>}
                </View>
            </View>
        </LinearGradient>

    );
}

export const connexionStyle = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        paddingTop: 50,
        display: "flex",
        gap: 30,
    },
    titleContainer: {
        width: '100%',
        display: 'flex',
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 40,
        color: 'white',
    },
    titleLabel: {
        fontSize: 20,
        color: colors.primary,
    },
    formContainer: {
        height: '85%',
        display: 'flex',
        justifyContent: "space-between",
        gap: 30,
        paddingBottom: 30
    },
    subtitle: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
    subMainContainer: {
        width: '100%',
        display: 'flex',
        gap: 30,
    },
    fullHeightFLex: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between"
    },
    loginFormContainer: {
        display: 'flex',
        height: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
        paddingTop: 50,
        width: '100%',
    },
    nomPrenomMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    connexionTypeToggleContainer: {
        display: 'flex',
        width: '100%',
    },
    connexionToggle: {
        textAlign: 'center'
    },
    boutonsMainContainer: {
        display: "flex",
        gap: 30,
        width: '100%'
    }
});