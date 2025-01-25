import {supabase} from "../initSupabase";

export interface YLieu {
    id: string;
    label: string,
    adresse: string,
    latitude: number,
    longitude: number,
    latitudeDelta?: number,
    longitudeDelta?: number
}

export async function getLieuFromID(id: number) {
    let { data: YLieu, error } = await supabase
        .from('YLieu')
        .select('*')
        .eq("id", id);
    if (error) {
        console.log(error);
    }
    return YLieu !== null ? YLieu as YLieu[] : null;
}