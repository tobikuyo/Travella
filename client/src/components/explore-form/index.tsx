import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TripDetails } from 'interfaces/trip';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete } from '@react-google-maps/api';
import { TripDatePickers, Input } from 'components';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateDestinationDetails } from 'store/reducers/trip.reducer';
import { tripDetailsSchema } from 'validations';
import { Form, SearchButton } from './ExploreForm.styles';

type PlacesAutoComplete = google.maps.places.Autocomplete;

const ExploreForm = () => {
    const dispatch = useAppDispatch();
    const [location, setLocation] = useState<PlacesAutoComplete>(
        {} as PlacesAutoComplete
    );

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm<TripDetails>({
        resolver: yupResolver(tripDetailsSchema)
    });

    const onPlaceChanged = (): void => {
        const { address_components, formatted_address, geometry } = location.getPlace();

        // Get the locality, natural feature (tends to apply to islands) and country information
        const addressComponents = address_components;

        const localityComponent = addressComponents?.find(component => {
            return component.types.includes('locality');
        });

        const naturalFeature = addressComponents?.find(component => {
            return component.types.includes('natural_feature');
        });

        const countryComponent = addressComponents?.find(component => {
            return component.types.includes('country');
        });

        const destinationLocality = localityComponent?.long_name;
        const destinationNaturalFeature = naturalFeature?.long_name;
        const destinationCountry = countryComponent?.long_name;

        // Get the location's bounds
        const destinationBounds = {
            ne: {
                lat: geometry?.viewport?.getNorthEast().lat(),
                lng: geometry?.viewport?.getNorthEast().lng()
            },
            sw: {
                lat: geometry?.viewport?.getSouthWest().lat(),
                lng: geometry?.viewport?.getSouthWest().lng()
            }
        };

        dispatch(
            updateDestinationDetails({
                destination: formatted_address,
                destinationLocality,
                destinationNaturalFeature,
                destinationCountry,
                destinationBounds
            })
        );
    };

    const onSubmit = (tripData: TripDetails) => {};

    useEffect(() => {
        setFocus('destination');
    }, [setFocus]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Autocomplete
                onLoad={location => setLocation(location)}
                onPlaceChanged={onPlaceChanged}
            >
                <Input
                    name="destination"
                    placeholder="Destination"
                    register={register}
                    error={errors?.destination?.message}
                    explore
                />
            </Autocomplete>
            <TripDatePickers register={register} errors={errors} />
            <SearchButton />
        </Form>
    );
};

export default ExploreForm;
