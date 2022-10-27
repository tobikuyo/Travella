import * as yup from 'yup';

export const tripDetailsSchema = yup.object().shape({
    destination: yup.string().required('Please enter a destination'),
    departureDate: yup.date().required('Please enter a departure date'),
    returnDate: yup.date().required('Please enter a return date')
});
