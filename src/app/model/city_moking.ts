


export class City {
    name: string | undefined;
    code: string | undefined;
}

export class PriceTicket {
    id: number | undefined;
    value: number | undefined;
}

export const ValuePrice: PriceTicket[] = [
    { id: 1, value: 1000 },
    { id: 2, value: 2000 },
    { id: 3, value: 5000 },

]


export const COUNTRY: City[] = [
    { name: 'Ho Chi Minh', code: 'HCM' },
    { name: 'Ha Noi', code: 'HN' },
    { name: 'Quang Ninh', code: 'QN' },
    { name: 'Da Nang', code: 'DN' },

]
