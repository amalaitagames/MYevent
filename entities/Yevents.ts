import getCategories, {
    AFTER_WORK,
    CONCERT,
    CONFERENCE,
    HUMOUR,
    SPECTACLE,
    YCategory
} from "./YCategory";
import moment from "moment";

export interface aYEvents {
    label: string,
    date: Date,
    image: string,
    type?: YCategory
    description?: string,
    lieu?: string,
    id?: number,
}

export default function getEvents(): aYEvents[] {
    return [
        {
            label: 'Concert de ouf',
            date: new Date('2025-01-01'),
            image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            type: CONCERT as YCategory
        },
        {
            label: 'Spectacle du comique',
            date: new Date('2025-10-01'),
            image: 'https://images.pexels.com/photos/12311203/pexels-photo-12311203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory
        },
        {
            label: 'Bilbou',
            date: new Date('2025-01-04'),
            image: 'https://images.pexels.com/photos/2955277/pexels-photo-2955277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory
        },
        {
            label: 'Tchikito',
            date: new Date('2025-01-24'),
            image: 'https://images.pexels.com/photos/3071456/pexels-photo-3071456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: SPECTACLE as YCategory
        },
        {label: 'Ernesto C cher pas moi',
            date: new Date('2025-01-18'),
            image: 'https://images.pexels.com/photos/1852389/pexels-photo-1852389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory
        },
        {
            label: 'Code better',
            date: new Date('2025-02-04'),
            image: 'https://images.pexels.com/photos/165907/pexels-photo-165907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: CONFERENCE as YCategory
        },
        {
            label: 'React Native',
            date: new Date('2025-03-04'),
            image: 'https://images.pexels.com/photos/6592677/pexels-photo-6592677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: AFTER_WORK as YCategory
        },
        {
            label: 'Plouf ploud',
            date: new Date('2025-07-04'),
            image: 'https://images.pexels.com/photos/6383282/pexels-photo-6383282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: SPECTACLE as YCategory
        },
        {
            label: 'Hi hi hi',
            date: new Date('2025-10-04'),
            image: 'https://images.pexels.com/photos/1115680/pexels-photo-1115680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory
        },
        {
            label: 'Ah ba ouais',
            date: new Date('2025-12-04'),
            image: 'https://images.pexels.com/photos/3321517/pexels-photo-3321517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            type: HUMOUR as YCategory
        },
    ];
}