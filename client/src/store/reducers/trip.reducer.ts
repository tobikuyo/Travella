import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DestinationDetails, TripDates, TripDetails } from 'interfaces/trip';

const initialState: TripDetails = {
    destination: undefined,
    destinationLocality: undefined,
    destinationNaturalFeature: undefined,
    destinationCountry: undefined,
    destinationBounds: undefined,
    departureDate: null,
    returnDate: null
};

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        updateDestinationDetails: (
            state,
            { payload }: PayloadAction<DestinationDetails>
        ) => {
            state.destination = payload.destination;
            state.destinationLocality = payload.destinationLocality;
            state.destinationNaturalFeature = payload.destinationNaturalFeature;
            state.destinationCountry = payload.destinationCountry;
            state.destinationBounds = payload.destinationBounds;
        },
        updateTripDates: (state, { payload }: PayloadAction<TripDates>) => {
            state.departureDate = payload.departureDate;
            state.returnDate = payload.returnDate;
        }
    }
});

export const { updateDestinationDetails, updateTripDates } = tripSlice.actions;
export default tripSlice.reducer;
