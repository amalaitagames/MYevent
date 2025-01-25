import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {formStyle} from "./ReservationFormComponent";
import {Controller} from "react-hook-form";
import React, {useEffect} from "react";
import {connexionStyle} from "./LoginComponent";
import {setFormControl} from "../lib/form.tools";
import {inscriptionFormSchema, saveNewUser} from "../service/login.form";
import {EventRegister} from "react-native-event-listeners";
import {reservationStyle} from "./ReservationComponent";

export default function InscriptionForm() {
    const inscriptionFormControl = setFormControl(inscriptionFormSchema);
    useEffect(() => {
        EventRegister.addEventListener('changePageClicked', (data) => {
            EventRegister.emit('changePage', data);
        });
        EventRegister.addEventListener('sendFormClicked', (data) => {
            if (data) {
                inscriptionFormControl.handleSubmit(onSubmit);
            }
        })
    });
    const onSubmit = (data) => {
        let savedUser = saveNewUser(inscriptionFormControl);
        if (savedUser !== undefined) {
            savedUser.then(r => {
                if (r !== null) {
                    let utilisateur = r.at(1);
                    if (utilisateur !== undefined) {
                        EventRegister.emit('utilisateur', utilisateur);
                    }
                }
            });
        }
    }
    return (
        <View style={connexionStyle.fullHeightFLex}>
            <View style={connexionStyle.subMainContainer}>
                <Text style={connexionStyle.subtitle}>Inscription</Text>

                <View style={connexionStyle.nomPrenomMainContainer}>
                    <View
                        style={[formStyle.inputGlobalContainer, formStyle.inputSmallWidth]}>
                        <Text style={formStyle.label}>Mon nom</Text>
                        <Controller
                            control={inscriptionFormControl.control}
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
                        {inscriptionFormControl.formState.errors.nom?.message ? <Text
                                style={formStyle.errorField}>{inscriptionFormControl.formState.errors.nom.message}</Text> :
                            <Text style={formStyle.errorField}></Text>}
                    </View>
                    <View
                        style={[formStyle.inputGlobalContainer, formStyle.inputSmallWidth]}>
                        <Text style={formStyle.label}>Mon prénom</Text>
                        <Controller
                            control={inscriptionFormControl.control}
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
                        {inscriptionFormControl.formState.errors.prenom?.message ? <Text
                                style={formStyle.errorField}>{inscriptionFormControl.formState.errors.prenom.message}</Text> :
                            <Text style={formStyle.errorField}></Text>}
                    </View>
                </View>
            </View>
            <View
                style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                <Text style={formStyle.label}>Mon mail</Text>
                <Controller
                    control={inscriptionFormControl.control}
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
                {inscriptionFormControl.formState.errors.email?.message ? <Text
                        style={formStyle.errorField}>{inscriptionFormControl.formState.errors.email.message}</Text> :
                    <Text style={formStyle.errorField}></Text>}
            </View>
            <View
                style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                <Text style={formStyle.label}>Mon Mot De Passe</Text>
                <Controller
                    control={inscriptionFormControl.control}
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
                {inscriptionFormControl.formState.errors.motDePasse?.message ? <Text
                        style={formStyle.errorField}>{inscriptionFormControl.formState.errors.motDePasse.message}</Text> :
                    <Text style={formStyle.errorField}></Text>}
            </View>
            <View
                style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                <Text style={formStyle.label}>Confirmer Mon Mot De Passe</Text>
                <Controller
                    control={inscriptionFormControl.control}
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
                {inscriptionFormControl.formState.errors.motDePasse?.message ? <Text
                        style={formStyle.errorField}>{inscriptionFormControl.formState.errors.motDePasse.message}</Text> :
                    <Text style={formStyle.errorField}></Text>}
            </View>
            <View style={connexionStyle.boutonsMainContainer}>
                <View style={reservationStyle.boutonContainer}>
                    <TouchableOpacity role="button" style={reservationStyle.boutonReserver}
                                      onPress={
                                          inscriptionFormControl.handleSubmit(onSubmit)
                                      }>

                        <Text style={reservationStyle.boutonLabel}>{"S\'INSCRIRE"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={connexionStyle.connexionTypeToggleContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            EventRegister.emit('isInscriptionChange', false);
                            inscriptionFormControl.clearErrors();
                        }}>
                        {
                            <Text style={connexionStyle.connexionToggle}>Se Connecter</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}