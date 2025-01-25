import {Reservation} from "./Reservation";

export interface Utilisateur {
    nom: string,
    prenom: string,
    mail: string,
    motDePasse: string,
    reservation?: Reservation[],
    id?: number;
}