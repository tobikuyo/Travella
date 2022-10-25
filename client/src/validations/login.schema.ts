import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Please enter a valid email'),
    password: yup
        .string()
        .required('Please enter a password')
        .min(6, 'Password must have at least 6 characters')
        .max(15, 'Password should not have more than 15 characters')
});
