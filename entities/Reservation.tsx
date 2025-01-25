import {supabase} from "../initSupabase";

export interface Reservation {
    nom: string,
    prenom: string,
    mail: string,
    nbrDeTicket: string
    id?: number,
    user_id?: string,
    event_id?: string
}

export async function getReservationParUtilisateurId(id: string) {
    let { data, error } = await supabase
        .from('Reservation')
        .select('*')
        .eq('user_id', id);

    if (data) {
        console.log(data)
    }
    if (error) {
        console.log(error)
    }

    return data !== null ? data as unknown as Reservation[] : null
}