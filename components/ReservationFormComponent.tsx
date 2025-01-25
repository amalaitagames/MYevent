import React, {useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../style/theme";
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Event from "../assets/event.svg";
import {getPlacesRestantesGommette, reservationStyle} from "./ReservationComponent";
import {useNavigation} from "@react-navigation/native";
import * as yup from "yup";
import {Controller} from "react-hook-form";
import {Reservation} from "../entities/Reservation";
import {mailRegex, setFormControl, textRegex} from "../lib/form.tools";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Utilisateur} from "../entities/Utilisateur";
import {createReservation} from "../service/database.service";
import {updateEvent, YeventDto} from "../entities/Yevents";

export default function ReservationFormComponent({route}) {
    const navigation = useNavigation();
    let event: YeventDto = route.params.event;
    const [utilisateurId, setUtilisateurId] = useState<string>();
    let utilisateurPromise = AsyncStorage.getItem("utilisateur");
    utilisateurPromise.then((utilisateur) => {
        if (utilisateur !== null) {
            let utilisateurDto = JSON.parse(utilisateur) as Utilisateur;
            console.log('utilisateur', utilisateurDto);
            setUtilisateurId(utilisateurDto.id);
        }
    })
    const formSchema = yup.object().shape({
        nom: yup.string()
            .matches(textRegex, "Nom invalide")
            .required("Le Nom est requis"),
        prenom: yup.string()
            .matches(textRegex, "Prenom invalide")
            .required("Le Prénom est requis"),
        email: yup.string()
            .email('Mail invalide')
            .matches(mailRegex, "Mail invalide")
            .required("L'Email est requis"),
        nbrDeTicket: yup.string()
            .typeError("Veuillez entrer une valeur numérique")
            .max(event.placesRestantes, 'Trop de places sélectionnées')
            .min(0, "Veuillez réserver au moins une place")
            .test('maxNumber', 'Ne peux pas exéder le nombre de places restantes', value => +value!! <= event.placesRestantes)
            .test("nonNegative", "La valeur doit être un chiffre", value => !value?.includes("-"))
            .test("nonString", "La valeur doit être un chiffre", value => value !== "-")
            .required("Veuillez prendre au moins une place")
    });
    const formControl = setFormControl(formSchema);

    const onSubmit = (data) => {
        let formControlErrorsValue = formControl.formState.errors;
        let isFormValid =
            formControlErrorsValue.nom === undefined
            && formControlErrorsValue.prenom === undefined
            && formControlErrorsValue.email === undefined
            && formControlErrorsValue.nbrDeTicket === undefined;
        let reservation: Reservation = {...data, event_id: event.id, user_id: utilisateurId};
        console.log("reservation", reservation);
        let placesRestantes = event.placesRestantes - +reservation.nbrDeTicket;
        let updatedEventAvecPlacesRestantes = {...event, placesRestantes: placesRestantes}
        if (formControl.formState.touchedFields && isFormValid) {
            let createdReservation = createReservation(reservation);
            createdReservation.then(r => {
                if (r !== null) {
                    let updatedEvent = updateEvent(updatedEventAvecPlacesRestantes);
                    updatedEvent.then(result => {
                        if (result !== null) {
                            navigation.navigate('ReservationReussie', {reservation: reservation, event: updatedEventAvecPlacesRestantes})
                        }
                    })

                }
            })
        }
    };
    return (
        <LinearGradient
            style={reservationStyle.gradientInfoContainer}
            colors={[colors.primary, colors.darkGradientSecondeColor]}
            start={{x: 1, y: 0}}
            end={{x: 0.1, y: 0.5}}
        >
            <View style={reservationStyle.mainContainer}>
                <ScrollView>
                    <View style={reservationStyle.infoMainContainer}>
                        <Text style={reservationStyle.eventLabel}>Rempli ce formulaire{'\n'}pour réserver ta
                            place</Text>
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
                        <View style={formStyle.formContainer}>
                            <View style={formStyle.nomPrenomContainer}>

                                <View
                                    style={[formStyle.inputGlobalContainer, formStyle.inputSmallWidth]}>
                                    <Text style={formStyle.label}>Mon nom</Text>
                                    <Controller
                                        control={formControl.control}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput
                                                style={formStyle.inputText}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                placeholder="Nom"
                                                textContentType="name"
                                            />
                                        )}
                                        name="nom"
                                        rules={{required: true}}
                                        defaultValue=""
                                    />
                                    {formControl.formState.errors.nom?.message ? <Text
                                            style={formStyle.errorField}>{formControl.formState.errors.nom.message}</Text> :
                                        <Text style={formStyle.errorField}></Text>}
                                </View>
                                <View
                                    style={[formStyle.inputGlobalContainer, formStyle.inputSmallWidth]}>
                                    <Text style={formStyle.label}>Mon prénom</Text>
                                    <Controller
                                        control={formControl.control}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput
                                                style={formStyle.inputText}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                placeholder="Prénom"
                                            />
                                        )}
                                        name="prenom"
                                        rules={{required: true}}
                                        defaultValue=""
                                    />
                                    {formControl.formState.errors.prenom?.message ? <Text
                                            style={formStyle.errorField}>{formControl.formState.errors.prenom.message}</Text> :
                                        <Text style={formStyle.errorField}></Text>}
                                </View>
                            </View>
                            <View
                                style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                                <Text style={formStyle.label}>Mon mail</Text>
                                <Controller
                                    control={formControl.control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput
                                            style={formStyle.inputText}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            textContentType={"emailAddress"}
                                            placeholder="Email"
                                        />
                                    )}
                                    name="email"
                                    rules={{required: true}}
                                    defaultValue=""
                                />
                                {formControl.formState.errors.email?.message ? <Text
                                        style={formStyle.errorField}>{formControl.formState.errors.email.message}</Text> :
                                    <Text style={formStyle.errorField}></Text>}
                            </View>
                            <View
                                style={[formStyle.inputPlacesNumberContainer, formStyle.inputFullWidth]}>
                                <Text style={formStyle.label}>Nombre de places</Text>
                                <Controller
                                    control={formControl.control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput
                                            style={formStyle.numericInput}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            keyboardType="numeric"
                                        />
                                    )}
                                    name="nbrDeTicket"
                                    rules={{required: true}}
                                />
                                {formControl.formState.errors.nbrDeTicket?.message ? <Text
                                        style={[formStyle.errorFieldNbrPlace, formStyle.errorField]}>{formControl.formState.errors.nbrDeTicket.message}</Text> :
                                    <Text style={formStyle.errorField}></Text>}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={reservationStyle.boutonContainer}>
                    <TouchableOpacity role="button" style={reservationStyle.boutonReserver}
                                      onPress={
                                          formControl.handleSubmit(onSubmit)
                                      }><Text
                        style={reservationStyle.boutonLabel}>VALIDER</Text></TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

export const formStyle = StyleSheet.create({
    formContainer: {
        display: 'flex',
        gap: 25
    },
    inputGlobalContainer: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    inputPlacesNumberContainer: {
        display: 'flex',
        alignItems: "center",
        gap: 10
    },
    inputSmallWidth: {
        width: "49%",
    },
    inputFullWidth: {
        width: "100%",
    },
    nomPrenomContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        color: colors.primary,
        paddingStart: 2,
        fontWeight: 500
    },
    inputText: {
        width: '100%',
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        color: colors.white,
    },
    numericInput: {
        color: colors.white,
        borderColor: colors.white,
        borderWidth: 3,
        borderRadius: 24,
        width: '30%',
        height: 80,
        fontSize: 30,
        textAlign: "center"
    },
    errorField: {
        height: 30,
        width: '100%',
        paddingTop: 5,
        color: colors.secondary,
        fontStyle: 'italic',
    },
    errorFieldNbrPlace: {
        textAlign: 'center',
    }
})