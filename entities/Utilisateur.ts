import {Reservation} from "./Reservation";

export interface Utilisateur {
    nom: string,
    prenom: string,
    mail: string,
    motDePasse: bigint,
    reservation: Reservation[],
    id?: number;
}