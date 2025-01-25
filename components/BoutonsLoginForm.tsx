import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {reservationStyle} from "./ReservationComponent";
import {connexionStyle} from "./LoginComponent";
import {EventRegister} from "react-native-event-listeners";


export default function BoutonsLoginForm({isInscription}) {
    const INSCRIPTION = {
        formBtn: "INSCRIPTION",
        navigationBtn: "Se Connecter"
    }
    const CONNEXION = {
        formBtn: "CONNEXION",
        navigationBtn: "S'Inscrire"
    }
    let submitBtnLabel = isInscription ? INSCRIPTION.formBtn : CONNEXION.formBtn;
    let btnLabel = isInscription ? INSCRIPTION.navigationBtn : CONNEXION.navigationBtn;
    return (
        <View style={connexionStyle.boutonsMainContainer}>
            <View style={reservationStyle.boutonContainer}>
                <TouchableOpacity role="button" style={reservationStyle.boutonReserver}
                                  onPress={() => EventRegister.emit('sendFormClicked', true)}>
                    <Text style={reservationStyle.boutonLabel}>{submitBtnLabel}</Text>
                </TouchableOpacity>
            </View>

            <View style={connexionStyle.connexionTypeToggleContainer}>
                <TouchableOpacity onPress={() => EventRegister.emit('changePageClicked', !isInscription)}>
                    <Text style={connexionStyle.connexionToggle}>{btnLabel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}