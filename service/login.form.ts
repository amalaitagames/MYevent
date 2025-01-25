import * as yup from "yup";
import {mailRegex, textRegex} from "../lib/form.tools";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {Utilisateur} from "../entities/Utilisateur";
import {createNewUser} from "./database.service";
import {useEffect, useState} from "react";
import {EventRegister} from "react-native-event-listeners";

export const inscriptionFormSchema = yup.object().shape({
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
        //.test("confirmation", "Les mots de passes doivent être identiques", value => value === formControl.getValues()["motDePasseConfirmation"])
});

export function saveNewUser(formControl: UseFormReturn<FieldValues, any, undefined>) {

    if (formControl.getValues()["motDePasse"] === formControl.getValues()["motDePasseConfirmation"]) {
        let utilisateur: Utilisateur = {
            nom: formControl.getValues()["nom"],
            prenom: formControl.getValues()["prenom"],
            mail: formControl.getValues()["email"],
            motDePasse: formControl.getValues()["motDePasse"]
        }
        return createNewUser(utilisateur).then(r => {
            if (r?.at(0) === true) {
                return r;
            }
            return r;
        });
    }
}

export function connexionUtilisateur(formControl: UseFormReturn<FieldValues, any, undefined>) {

}
