import {Utilisateur} from "../entities/Utilisateur";
import {supabase} from "../initSupabase";

const bcryptjs = require("bcryptjs");


export function databaseConnexion() {
}

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
    console.log("Utilisateur: ", utilisateur);
    //const salt = bcryptjs.genSaltSync(10);
    //const hash = bcryptjs.hashSync(utilisateur.motDePasse, salt);
        // let { data, error } = await supabase.auth.signUp({
        //     email: utilisateur.mail,
        //     password: utilisateur.motDePasse
        // }).then(r => {
        //     console.log("result: ", r);
        //     console.log("data: ",data);
        // });

        // if (data !== null) {
            console.log("enregistrer utilisateur")
          return await saveUtilisateurSupabase(utilisateur);
        // }
}

export async function getUtilisateurFromMail(mail: string) {
    let {data: Utilisateur, error} = await supabase
        .from('Utilisateur')
        .select('mail');
    console.log(Utilisateur);
    return Utilisateur;

}