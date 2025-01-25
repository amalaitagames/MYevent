import 'react-native-get-random-values'
import 'moment/locale/fr'
import moment from "moment";
import {YLieu} from "./YLieu";
import {supabase} from "../initSupabase";

export interface aYEvents {
    id: string,
    label: string,
    date: Date,
    image: string,
    placesRestantes: number
    placesTotales: number
    type?: number
    description?: string,
    lieu: number,
}

export interface YeventDto {
    label: string,
    date: string,
    image: string,
    categorie: string,
    description: string,
    lieu: YLieu,
    id: string,
    placesTotale: number,
    placesRestantes: number
}

export function makeEventDto(yEvent: aYEvents, lieuDto: YLieu, categorieDtoLabel: string): YeventDto {
    return {
        label: yEvent.label,
        image: yEvent.image,
        description: yEvent.description ? yEvent.description : "Pas de descritpion",
        lieu: lieuDto,
        id: yEvent.id,
        date: moment.parseZone(yEvent.date).locale("fr").format("ddd DD MMMM YYYY"),
        categorie: categorieDtoLabel,
        placesTotale: yEvent.placesTotales,
        placesRestantes: yEvent.placesRestantes
    }
}

export async function getEventsPromise(): Promise<aYEvents[]> {
    let {data, error} = await supabase
        .from('Yevents')
        .select(
            '*'
        )
    if (data) {
        console.log(data)
    }
    if (error) {
        console.log(error)
    }
    return data === null ? [] : data as unknown as aYEvents[];
}

export async function updateEvent(eventDto: YeventDto) {
    const { data, error } = await supabase
        .from('Yevents')
        .update({ placesRestantes: eventDto.placesRestantes })
        .eq('id', eventDto.id)
        .select()
    if (data) {
        console.log(data)
    }
    if (error) {
        console.log(error)
    }
    return data === null ? [] : data as unknown as aYEvents;
}