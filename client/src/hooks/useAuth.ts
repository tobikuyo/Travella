import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION, REGISTER_USER_MUTATION } from 'graphql/mutations/user';
import {
    LoginSuccess,
    Mutation,
    MutationLoginUserArgs,
    MutationRegisterUserArgs,
    ResolverError
} from 'graphql/schema/generated';
import { LoginUser, RegisterUser } from 'interfaces/User';

export const useAuth = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'error'>('error');
    const [mutationSuccess, setMutationSuccess] = useState<string | null>(null);
    const [mutationError, setMutationError] = useState<string | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const [registerUser] = useMutation<Mutation, MutationRegisterUserArgs>(
        REGISTER_USER_MUTATION
    );
    const [loginUser] = useMutation<Mutation, MutationLoginUserArgs>(LOGIN_USER_MUTATION);

    const handleLoginUser = async (userData: LoginUser) => {
        const { data } = await loginUser({ variables: userData });

        // Check the resolveType, in order to get the appropriate data
        const typename = data?.loginUser.__typename;

        if (typename === 'LoginSuccess') {
            const { accessToken } = data?.loginUser as LoginSuccess;
            localStorage.setItem('token', accessToken);
        }

        if (typename === 'ResolverError') {
            const { message } = data?.loginUser as ResolverError;
            setShowAlert(true);
            setMutationSuccess(null);
            setMutationError(message);
        }
    };

    const handleRegisterUser = async (userData: RegisterUser) => {
        const { data } = await registerUser({ variables: { input: userData } });
        if (!data) return;

        setShowAlert(true);

        if (data.registerUser.success) {
            setSeverity('success');
            setMutationError(null);
            setMutationSuccess('Account created successfully');

            // If the registration was successful, just log in the user with the same credentials and
            // store the access token in local storage, so that they don't have to repeat this process.
            handleLoginUser(userData);
            setUserLoggedIn(true);
        }

        // Display error message
        if (!data.registerUser.success) {
            setSeverity('error');
            setMutationSuccess(null);
            setMutationError(data.registerUser.message);
        }
    };

    return {
        showAlert,
        severity,
        mutationSuccess,
        mutationError,
        userLoggedIn,
        setShowAlert,
        handleRegisterUser,
        handleLoginUser
    };
};
