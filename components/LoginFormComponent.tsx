import React, {useEffect, useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {formStyle} from "./ReservationFormComponent";
import {Controller} from "react-hook-form";
import {connexionStyle} from "./LoginComponent";
import {mailRegex, setFormControl} from "../lib/form.tools";
import {EventRegister} from "react-native-event-listeners";
import {reservationStyle} from "./ReservationComponent";
import {UtilisateurLogin} from "../entities/UtilisateurLogin";
import {supabase} from "../initSupabase";
import * as yup from "yup";
import {getUtilisateur} from "../service/database.service";

export default function LoginFormComponent() {
    const [isLogValid, setIsLogValid] = useState<boolean | null>(true);
    const loginFormSchema = yup.object().shape({
        email: yup.string()
            .email('Mail invalide')
            .matches(mailRegex, "Mail invalide")
            .required("L'Email est requis")
            .test('logs invalides', 'Identifiants incorrects', value => isLogValid),
        motDePasse: yup.string()
            .required("Le mot de passe est requis.")
            .min(8, "Le mot de passe doit avoir au moins 8 charactères.")
            .test('logs invalides', 'Identifiants incorrects', value => isLogValid)
    });
    const loginFormControl = setFormControl(loginFormSchema);
    useEffect(() => {
        EventRegister.addEventListener('changePageClicked', (data) => {
            EventRegister.emit('changePage', data);
        });
    });
    const onSubmit = async (utilisateurLog) => {
        let utilisateur: UtilisateurLogin = utilisateurLog;
        let {data, error} = await supabase.auth.signInWithPassword({
            email: utilisateur.email,
            password: utilisateur.motDePasse
        });
        if (data) {
            setIsLogValid(true);
            let utilisateurPromise = getUtilisateur(data.user?.id!!);
            utilisateurPromise.then(utilisateur => {
                EventRegister.emit('utilisateur', utilisateur);
            })

        }

        if (error) {
            console.log(error.message);
            setIsLogValid(false);
        }
    }

    return (
        <View style={connexionStyle.fullHeightFLex}>
            <View style={connexionStyle.loginFormContainer}>
                <Text style={connexionStyle.subtitle}>Connexion</Text>

                <View
                    style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                    <Text style={formStyle.label}>Mon mail</Text>
                    <Controller
                        control={loginFormControl.control}
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
                    {loginFormControl.formState.errors.email?.message ? <Text
                            style={formStyle.errorField}>{loginFormControl.formState.errors.email.message}</Text> :
                        <Text style={formStyle.errorField}>
                            {!isLogValid ?
                                'Identifiants incorrects' : ''
                            }
                        </Text>

                    }
                </View>
                <View
                    style={[formStyle.inputGlobalContainer, formStyle.inputFullWidth]}>
                    <Text style={formStyle.label}>Mon Mot De Passe</Text>
                    <Controller
                        control={loginFormControl.control}
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
                    {loginFormControl.formState.errors.motDePasse?.message ? <Text
                            style={formStyle.errorField}>{loginFormControl.formState.errors.motDePasse.message}</Text> :
                        <Text style={formStyle.errorField}>
                            {!isLogValid ?
                                'Identifiants incorrects' : ''
                            }
                        </Text>
                    }
                </View>
                <View style={connexionStyle.boutonsMainContainer}>
                    <View style={reservationStyle.boutonContainer}>
                        <TouchableOpacity role="button" style={reservationStyle.boutonReserver}
                                          onPress={
                                              loginFormControl.handleSubmit(onSubmit)
                                          }>

                            <Text style={reservationStyle.boutonLabel}>{"SE CONNECTER"}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={connexionStyle.connexionTypeToggleContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                EventRegister.emit('isInscriptionChange', true);
                                loginFormControl.clearErrors();
                            }}>
                            {
                                <Text style={connexionStyle.connexionToggle}>S'Inscrire</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}