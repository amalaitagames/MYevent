export interface YCategory {
    id: number,
    label: string
}

export default function getCategories(): YCategory[] {
    return [
        {id: 0, label:'Music'}, 
        {id: 1, label: 'Sport'},
        {id: 1, label: 'Talk'},
        {id: 1, label: 'Comedy'},
        {id: 1, label: 'Show'},
        {id: 1, label: 'Happening'},
        {id: 1, label: 'After Work'}
    ];
} 