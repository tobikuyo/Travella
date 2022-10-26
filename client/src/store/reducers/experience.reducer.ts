import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attraction, Hotel, Restaurant } from 'graphql/schema/generated';
import { FetchExperienceArgs } from 'interfaces/experience';

interface FetchRestaurants {
    restaurants: Restaurant[];
    hotels?: never;
    attractions?: never;
}

interface FetchHotels {
    restaurants?: never;
    hotels: Hotel[];
    attractions?: never;
}

interface FetchAttractions {
    restaurants?: never;
    hotels?: never;
    attractions: Attraction[];
}

type FetchExperiences = FetchRestaurants | FetchHotels | FetchAttractions;

interface ExperiencesState {
    loading: boolean;
    error: string | null;
    restaurants: Restaurant[] | null;
    hotels: Hotel[] | null;
    attractions: Attraction[] | null;
}

const initialState: ExperiencesState = {
    loading: false,
    error: null,
    restaurants: null,
    hotels: null,
    attractions: null
};

export const fetchExperiences = createAsyncThunk(
    'trip/fetchExperiences',
    async ({ type, sw, ne }: FetchExperienceArgs) => {
        try {
            const {
                data: { data }
            } = await axios.get(
                `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
                {
                    params: {
                        bl_latitude: sw.lat,
                        tr_latitude: ne.lat,
                        bl_longitude: sw.lng,
                        tr_longitude: ne.lng
                    },
                    headers: {
                        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
                    }
                }
            );
            return data;
        } catch (error) {
            console.error('Fetch Experiences:', error);
        }
    }
);

const experienceSlice = createSlice({
    name: 'experiences',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchExperiences.pending, state => {
            state.loading = true;
        });
        builder.addCase(
            fetchExperiences.fulfilled,
            (state, { payload }: PayloadAction<FetchExperiences>) => {
                const { restaurants, hotels, attractions } = payload;

                state.loading = false;
                state.restaurants = restaurants ? restaurants : state.restaurants;
                state.hotels = hotels ? hotels : state.hotels;
                state.attractions = attractions ? attractions : state.attractions;
                state.error = null;
            }
        );
        builder.addCase(fetchExperiences.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error.message || 'Something went wrong';
        });
    }
});

export default experienceSlice.reducer;
