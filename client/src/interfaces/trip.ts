import { Bounds } from './experience';

export interface DestinationDetails {
    destination: string | undefined;
    destinationLocality: string | undefined;
    destinationNaturalFeature: string | undefined;
    destinationCountry: string | undefined;
    destinationBounds: Bounds | undefined;
}

export interface TripDates {
    departureDate: string | null;
    returnDate: string | null;
}

export type TripDetails = DestinationDetails & TripDates;
