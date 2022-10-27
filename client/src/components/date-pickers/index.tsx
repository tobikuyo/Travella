import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { ErrorLabel, StyledInput } from 'components/input/Input.styles';
import { TripDetails } from 'interfaces/trip';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateTripDates } from 'store/reducers/trip.reducer';

type TripDatePickersProps = {
    register: UseFormRegister<TripDetails>;
    errors: Partial<
        FieldErrorsImpl<{
            departureDate: Date;
            returnDate: Date;
        }>
    >;
};

const TripDatePickers = ({ register, errors, ...rest }: TripDatePickersProps) => {
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const dispatch = useAppDispatch();

    const onDepartureChange = (date: Date) => setDepartureDate(date);
    const onReturnChange = (date: Date) => setReturnDate(date);

    useEffect(() => {
        if (!departureDate || !returnDate) return;

        const departureDateISO = departureDate.toISOString();
        const returnDateISO = returnDate.toISOString();

        dispatch(
            updateTripDates({
                departureDate: departureDateISO,
                returnDate: returnDateISO
            })
        );
    }, [departureDate, returnDate, dispatch]);

    return (
        <>
            {/* Departure Date Picker */}
            <DatePicker
                selected={departureDate}
                selectsStart
                startDate={departureDate}
                endDate={returnDate}
                onChange={onDepartureChange}
                placeholderText={'Departure Date'}
                dateFormat="do MMMM yyyy"
                minDate={new Date()}
                withPortal
                customInput={
                    <StyledInput
                        id="departureDate"
                        error={
                            !departureDate ? errors?.departureDate?.message : undefined
                        }
                        explore
                        {...register('departureDate')}
                        {...rest}
                    />
                }
            />

            {/* Departure Date Error Message */}
            {!departureDate && (
                <ErrorLabel htmlFor="departureDate">
                    {errors?.departureDate?.message}
                </ErrorLabel>
            )}

            {/* Return Date Picker */}
            <DatePicker
                selected={returnDate}
                onChange={onReturnChange}
                selectsEnd
                startDate={departureDate}
                endDate={returnDate}
                minDate={departureDate}
                placeholderText={'Return Date'}
                dateFormat="do MMMM yyyy"
                withPortal
                customInput={
                    <StyledInput
                        id="returnDate"
                        error={!returnDate ? errors?.returnDate?.message : undefined}
                        explore
                        {...register('returnDate')}
                        {...rest}
                    />
                }
            />

            {/* Return Date Error Message */}
            {!returnDate && errors?.returnDate && (
                <ErrorLabel htmlFor="returnDate">
                    {errors?.returnDate?.message}
                </ErrorLabel>
            )}
        </>
    );
};

export default TripDatePickers;
