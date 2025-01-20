export interface YCategory {
    id: number,
    label: string
}

export default function getCategories(): YCategory[] {
    return [
        CONCERT,
        SPORT,
        CONFERENCE,
        HUMOUR,
        SPECTACLE,
        HAPPENING,
        AFTER_WORK
    ];
}

export const CONCERT: YCategory = {id: 0, label:'Concert'} as YCategory;
export const SPORT: YCategory = {id: 1, label: 'Sport'} as YCategory;
export const CONFERENCE: YCategory = {id: 2, label: 'Conférence'} as YCategory;
export const HUMOUR: YCategory = {id: 3, label: 'Humour'} as YCategory;
export const SPECTACLE: YCategory = {id: 4, label: 'Spectacle'} as YCategory;
export const HAPPENING: YCategory = {id: 5, label: 'Happening'} as YCategory;
export const AFTER_WORK: YCategory = {id: 6, label: 'After Work'} as YCategory;