export type NameInfo = {
    name:string;
    age: number;
    gender: string;
    countries: CountryType[];
};

export type CountryType = {
    country_id:string;
    probability: number;
}
