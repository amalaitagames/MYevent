import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../style/theme";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Event from "../assets/event.svg";
import {getPlacesRestantesGommette, reservationStyle} from "./ReservationComponent";
import {useNavigation} from "@react-navigation/native";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

export default function ReservationFormComponent({route}) {
    const navigation = useNavigation();
    let event = route.params.event;
    const textRegex = /^[a-zA-Z\s]+$/;
    const formSchema = yup.object().shape({
        nom: yup.string()
            .matches(textRegex, "Nom invalide")
            .required("Le Nom est requis"),
        prenom: yup.string()
            .matches(textRegex, "Prenom invalide")
            .required("Le Prénom est requis"),
        email: yup.string()
            .email('Mail invalide')
            .matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, "Mail invalide")
            .required("L'Email est requis"),
        nbrDeTicket: yup.string()
            .min(event.placesRestantes, 'Trop de places sélectionnées')
            .required("Veuillez prendre au moins une place")
    });
    const formControl = useForm({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data) => {

        if(formControl.formState.isValid) {
            console.log("formValid")
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
                    <View style={reservationFormStyle.formContainer}>
                        <View style={reservationFormStyle.nomPrenomContainer}>

                            <View
                                style={[reservationFormStyle.inputGlobalContainer, reservationFormStyle.inputSmallWidth]}>
                                <Text style={reservationFormStyle.label}>Mon nom</Text>
                                <Controller
                                    control={formControl.control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput
                                            style={reservationFormStyle.inputText}
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
                                {formControl.formState.errors.nom?.message ? <Text style={reservationFormStyle.errorField}>{formControl.formState.errors.nom.message}</Text> : <Text style={reservationFormStyle.errorField}></Text>}
                            </View>
                            <View
                                style={[reservationFormStyle.inputGlobalContainer, reservationFormStyle.inputSmallWidth]}>
                                <Text style={reservationFormStyle.label}>Mon prénom</Text>
                                <Controller
                                    control={formControl.control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput
                                            style={reservationFormStyle.inputText}
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
                                {formControl.formState.errors.prenom?.message ? <Text style={reservationFormStyle.errorField}>{formControl.formState.errors.prenom.message}</Text> : <Text style={reservationFormStyle.errorField}></Text>}
                            </View>
                        </View>
                        <View style={[reservationFormStyle.inputGlobalContainer, reservationFormStyle.inputFullWidth]}>
                            <Text style={reservationFormStyle.label}>Mon mail</Text>
                            <Controller
                                control={formControl.control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={reservationFormStyle.inputText}
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
                            {formControl.formState.errors.email?.message ? <Text style={reservationFormStyle.errorField}>{formControl.formState.errors.email.message}</Text> : <Text style={reservationFormStyle.errorField}></Text>}
                        </View>
                        <View style={[reservationFormStyle.inputGlobalContainer, reservationFormStyle.inputFullWidth]}>
                            <Text style={reservationFormStyle.label}>Nombre de places</Text>
                            <Controller
                                control={formControl.control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={reservationFormStyle.numericInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType="numeric"
                                    />
                                )}
                                name="nbrDeTicket"
                                rules={{required: true}}
                                defaultValue=""
                            />
                            {formControl.formState.errors.nbrDeTicket?.message ? <Text style={reservationFormStyle.errorField}>{formControl.formState.errors.nbrDeTicket.message}</Text> : <Text style={reservationFormStyle.errorField}></Text>}
                        </View>
                    </View>
                    <View style={reservationStyle.boutonContainer}>
                        <TouchableOpacity role="button" style={reservationStyle.boutonReserver}
                                          onPress={
                                              formControl.handleSubmit(onSubmit)
                                          }><Text
                            style={reservationStyle.boutonLabel}>VALIDER</Text></TouchableOpacity>
                    </View>

                </View>
            </View>
        </LinearGradient>
    )
}

const reservationFormStyle = StyleSheet.create({
    formContainer: {
        display: 'flex',
        gap: 25
    },
    inputGlobalContainer: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
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
    }
})