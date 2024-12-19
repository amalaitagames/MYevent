import { YCategory } from "./YCategory";

export interface aYEvents {
    label: string,
    date: string,
    image: string,
    description?: string,
    lieu?:string,
    id?: number,
    type?: YCategory
}


 export default function getEvents(): aYEvents[]{ 
    return [
        {label: 'Concert de ouf', date: '14/07/2025', image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
        {label: 'Spectacle du comique', date: '14/07/2025', image: 'https://images.pexels.com/photos/12311203/pexels-photo-12311203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
        {label: 'Bilbou', date: '14/07/2025', image: 'https://images.pexels.com/photos/2955277/pexels-photo-2955277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
        {label: 'Tchikito', date: '14/07/2025', image: 'https://images.pexels.com/photos/3071456/pexels-photo-3071456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
        {label: 'Ernesto C cher pas moi', date: '14/07/2025', image: ''},
        {label: 'Code better', date: '14/07/2025', image: 'https://images.pexels.com/photos/165907/pexels-photo-165907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
        {label: 'React Native', date: '14/07/2025', image: 'https://images.pexels.com/photos/6592677/pexels-photo-6592677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
        {label: 'Plouf ploud', date: '14/07/2025', image: 'https://images.pexels.com/photos/6383282/pexels-photo-6383282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
        {label: 'Hi hi hi', date: '14/07/2025', image: 'https://images.pexels.com/photos/1115680/pexels-photo-1115680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
        {label: 'Ah ba ouais', date: '14/07/2025', image: 'https://images.pexels.com/photos/3321517/pexels-photo-3321517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
    ];
}