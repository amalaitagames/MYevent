import 'react-native-get-random-values'
const {v4: uuidv4} = require('uuid');
import 'moment/locale/fr'
import getCategories, {
    AFTER_WORK,
    CONCERT,
    CONFERENCE,
    HUMOUR,
    SPECTACLE,
    YCategory
} from "./YCategory";
import moment from "moment";
import {YLieu} from "./YLieu";

export interface aYEvents {
    id: string,
    label: string,
    date: Date,
    image: string,
    places: number
    placesTotale: number
    type?: YCategory
    description?: string,
    lieu: YLieu,
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

export function makeEventDto(yEvent: aYEvents): YeventDto {
    return {
        label: yEvent.label,
        image: yEvent.image,
        description: yEvent.description ? yEvent.description : "Pas de descritpion",
        lieu: yEvent.lieu,
        id: yEvent.id,
        date: moment.parseZone(yEvent.date).locale("fr").format("ddd DD MMMM YYYY"),
        categorie: yEvent.type?.label!!,
        placesTotale: yEvent.placesTotale,
        placesRestantes: yEvent.places
    }
}

export default function getEvents(): aYEvents[] {
    return [
        {
            id: uuidv4(),
            label: 'Concert de ouf',
            date: new Date('2025-01-01'),
            image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            type: CONCERT as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Accor Arena", adresse: " 8 Boulevard de Bercy, Paris, 75012, France", latitude: 48.83872, longitude: 2.3788}
        },
        {
            id: uuidv4(),
            label: 'Spectacle du comique',
            date: new Date('2025-10-01'),
            image: 'https://images.pexels.com/photos/12311203/pexels-photo-12311203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Transbordeur", adresse:"3 Boulevard de la Bataille de Stalingrad, 69100 Villeurbanne, France" , latitude: 45.782174, longitude: 4.860603}
        },
        {
            id: uuidv4(),
            label: 'Bilbou',
            date: new Date('2025-01-04'),
            image: 'https://images.pexels.com/photos/2955277/pexels-photo-2955277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Zénith", adresse: "Rue Krestner, 4200 Saint-Étienne", latitude: 45.4333, longitude: 4.4}
        },
        {
            id: uuidv4(),
            label: 'Tchikito',
            date: new Date('2025-01-24'),
            image: 'https://images.pexels.com/photos/3071456/pexels-photo-3071456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: SPECTACLE as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Le Dôme", adresse: "48 Avenue St Just, 13004 Marseille", latitude: 43.317439, longitude: 5.4052737}
        },
        {
            id: uuidv4(),label: 'Ernesto C cher pas moi',
            date: new Date('2025-01-18'),
            image: 'https://images.pexels.com/photos/1852389/pexels-photo-1852389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Accor Arena", adresse: " 8 Boulevard de Bercy, Paris, 75012, France", latitude: 48.83872, longitude: 2.3788}
        },
        {
            id: uuidv4(),
            label: 'Code better',
            date: new Date('2025-02-04'),
            image: 'https://images.pexels.com/photos/165907/pexels-photo-165907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: CONFERENCE as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Zénith", adresse: "Rue Krestner, 4200 Saint-Étienne", latitude: 45.4333, longitude: 4.4}
        },
        {
            id: uuidv4(),
            label: 'React Native',
            date: new Date('2025-03-04'),
            image: 'https://images.pexels.com/photos/6592677/pexels-photo-6592677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: AFTER_WORK as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Transbordeur", adresse:"3 Boulevard de la Bataille de Stalingrad, 69100 Villeurbanne, France" , latitude: 45.782174, longitude: 4.860603}
        },
        {
            id: uuidv4(),
            label: 'Plouf ploud',
            date: new Date('2025-07-04'),
            image: 'https://images.pexels.com/photos/6383282/pexels-photo-6383282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: SPECTACLE as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Transbordeur", adresse:"3 Boulevard de la Bataille de Stalingrad, 69100 Villeurbanne, France" , latitude: 45.782174, longitude: 4.860603}
        },
        {
            id: uuidv4(),
            label: 'Hi hi hi',
            date: new Date('2025-10-04'),
            image: 'https://images.pexels.com/photos/1115680/pexels-photo-1115680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Zénith", adresse: "Rue Krestner, 4200 Saint-Étienne", latitude: 45.4333, longitude: 4.4}
        },
        {
            id: uuidv4(),
            label: 'Ah ba ouais',
            date: new Date('2025-12-04'),
            image: 'https://images.pexels.com/photos/3321517/pexels-photo-3321517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory,
            placesTotale: 170,
            places: 170,
            lieu: {label: "Accor Arena", adresse: " 8 Boulevard de Bercy, Paris, 75012, France", latitude: 48.83872, longitude: 2.3788}
        },
    ];
}