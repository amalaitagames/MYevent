import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as yup from "yup";
import {mailRegex, setFormControl, textRegex} from "../lib/form.tools";
import {Controller, FieldValues, UseFormReturn} from "react-hook-form";
import {formStyle} from "./ReservationFormComponent";
import {LinearGradient} from "expo-linear-gradient";
import {reservationStyle} from "./ReservationComponent";
import colors from "../style/theme";
import {createNewUser} from "../service/database.service";
import {Utilisateur} from "../entities/Utilisateur";
import {useNavigation} from "@react-navigation/native";
import {saveInLocalStorage} from "../service/tools";

function saveNewUser(formControl: UseFormReturn<FieldValues, any, undefined>) {

    if (formControl.getValues()["motDePasse"] === formControl.getValues()["motDePasseConfirmation"]) {
        let utilisateur: Utilisateur = {
            nom: formControl.getValues()["nom"],
            prenom: formControl.getValues()["prenom"],
            mail: formControl.getValues()["email"],
            motDePasse: formControl.getValues()["motDePasse"]
        }
        return createNewUser(utilisateur).then(r => {
            if (r?.at(0) === true) {
                console.log("Utilisateur saved");
                return r;
            }
            return r;
        });
    }
}

export default function LoginComponent() {
    const navigation = useNavigation();
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
        motDePasse: yup.string()
            .required("Le mot de passe est requis.")
            .min(8, "Le mot de passe doit avoir au moins 8 charactères."),
        motDePasseConfirmation: yup.string()
            .required("Veuillez confirmer votre mot de passe.")
            .min(8, "Le mot de passe doit avoir au moins 8 charactères.")
            .test("confirmation", "Les mots de passes doivent être identiques", value => value === formControl.getValues()["motDePasseConfirmation"])
    });

    const formControl = setFormControl(formSchema);
    const [isInscription, setInscription] = useState(false);
    const onSubmit = (data) => {
        if (isInscription) {
        let savedUser = saveNewUser(formControl);
        if (savedUser !== undefined) {
            savedUser.then(r => {
                let utilisateur = r.at(1);
                if (utilisateur !== undefined) {
                   saveInLocalStorage('utilisateur', JSON.stringify(utilisateur));
                    navigation.navigate("Home", {utilisateur: utilisateur});
                }
            })
        }

        }
    }
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
                    {isInscription ?
                        <View style={connexionStyle.subMainContainer}>
                            <Text style={connexionStyle.subtitle}>Inscription</Text>

                            <View style={connexionStyle.nomPrenomMainContainer}>
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
                        </View>
                        :
                        <View><Text style={connexionStyle.subtitle}>Connexion</Text></View>
                    }
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
                        style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                        <Text style={formStyle.label}>Mon Mot De Passe</Text>
                        <Controller
                            control={formControl.control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    style={formStyle.inputText}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    textContentType={"newPassword"}
                                    placeholder="Mot de passe"
                                    secureTextEntry={true}
                                />
                            )}
                            name="motDePasse"
                            rules={{required: true}}
                            defaultValue=""
                        />
                        {formControl.formState.errors.motDePasse?.message ? <Text
                                style={formStyle.errorField}>{formControl.formState.errors.motDePasse.message}</Text> :
                            <Text style={formStyle.errorField}></Text>}
                    </View>
                    {
                        isInscription ?
                            <View
                                style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                                <Text style={formStyle.label}>Confirmer Mon Mot De Passe</Text>
                                <Controller
                                    control={formControl.control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <TextInput
                                            style={formStyle.inputText}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            textContentType={"password"}
                                            placeholder="Confirmation Mot de passe"
                                            secureTextEntry={true}
                                        />
                                    )}
                                    name="motDePasseConfirmation"
                                    rules={{required: true}}
                                    defaultValue=""
                                />
                                {formControl.formState.errors.motDePasse?.message ? <Text
                                        style={formStyle.errorField}>{formControl.formState.errors.motDePasse.message}</Text> :
                                    <Text style={formStyle.errorField}></Text>}
                            </View> : null
                    }
                    <View style={reservationStyle.boutonContainer}>
                        <TouchableOpacity role="button" style={reservationStyle.boutonReserver}
                                          onPress={
                                              formControl.handleSubmit(onSubmit)
                                          }>

                            <Text
                                style={reservationStyle.boutonLabel}>{isInscription ?
                                "S\'INSCRIRE" : "SE CONNECTER"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={connexionStyle.connexionTypeToggleContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setInscription(!isInscription);
                                formControl.clearErrors();
                            }}
                        >
                            {
                                isInscription ?
                                    <Text style={connexionStyle.connexionToggle}>Se Connecter</Text>
                                    : <Text style={connexionStyle.connexionToggle}>Créer un compte</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>

    );
}

const connexionStyle = StyleSheet.create({
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
        height: '80%',
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
        display: 'flex',
        gap: 30,
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
    }
});