import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TripDetails } from 'interfaces/trip';
import { yupResolver } from '@hookform/resolvers/yup';
import { tripDetailsSchema } from 'validations';
import { Form, SearchButton } from './ExploreForm.styles';

const ExploreForm = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm<TripDetails>({
        resolver: yupResolver(tripDetailsSchema)
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TripDatePickers register={register} errors={errors} />
            <SearchButton />
        </Form>
    );
};

export default ExploreForm;
