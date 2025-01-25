import {Utilisateur} from "../entities/Utilisateur";
import {supabase} from "../initSupabase";
import {UtilisateurLogin} from "../entities/UtilisateurLogin";
import {Reservation} from "../entities/Reservation";

const bcryptjs = require("bcryptjs");

async function saveUtilisateurSupabase(utilisateur: Utilisateur): Promise<[boolean, Utilisateur]> {
    let savedUSer = await supabase
        .from('Utilisateur')
        .insert([
            {
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                mail: utilisateur.mail,
                motDePasse: utilisateur.motDePasse,
            },
        ])
        .select();
    return [savedUSer.status === 201, savedUSer.data?.at(0)];
}

export async function createNewUser(utilisateur: Utilisateur) {
    let utilisateurLogin: UtilisateurLogin = {email: utilisateur.mail, motDePasse: utilisateur.motDePasse};
    let loggedUser = await signUpNewUser(utilisateurLogin);
    if (loggedUser !== null) {
        utilisateur.user_id = loggedUser.id
    }
    return loggedUser !== null ? await saveUtilisateurSupabase(utilisateur) : null;
}

export async function signUpNewUser(utilisateurLogin: UtilisateurLogin) {
    let {data, error} = await supabase.auth.signUp({
        email: utilisateurLogin.email,
        password: utilisateurLogin.motDePasse
    });
    if (error) {
        console.error(error);
    }

    return data.user;
}

export async function getUtilisateur(uid: string): Promise<Utilisateur> {
    let { data: Utilisateur, error } = await supabase
        .from('Utilisateur')
        .select('*');

    if (error) {
        console.log(error.message);
    }

    return Utilisateur?.at(0);
}

export async function createReservation(reservation: Reservation) {
    const { data, error } = await supabase
        .from('Reservation')
        .insert(reservation)
        .select();

    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
    return data;
}
