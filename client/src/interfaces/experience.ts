export enum Experience {
    Restaurant = 'restaurant',
    Hotel = 'hotel',
    Attraction = 'attraction'
}

interface Coordinates {
    lat: number | undefined;
    lng: number | undefined;
}

export interface Bounds {
    ne: Coordinates;
    sw: Coordinates;
}

export interface FetchExperienceArgs {
    type: Experience;
    sw: Coordinates;
    ne: Coordinates;
}
