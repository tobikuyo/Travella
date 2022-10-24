import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, SnackbarAlert } from 'components';
import { LOGIN_USER_MUTATION, REGISTER_USER_MUTATION } from 'graphql/mutations/user';
import {
    LoginSuccess,
    Mutation,
    MutationLoginUserArgs,
    MutationRegisterUserArgs,
    ResolverError
} from 'graphql/schema/generated';
import { LoginUser, RegisterUser } from 'interfaces/User';
import { Heading } from 'styles';
import { registerSchema } from 'validations';
import { Form, Submit, HelperText } from './Register.styles';

const Register = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'error'>('error');
    const [mutationSuccess, setMutationSuccess] = useState<string | null>(null);
    const [mutationError, setMutationError] = useState<string | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm<RegisterUser>({
        resolver: yupResolver(registerSchema)
    });

    const [registerUser] = useMutation<Mutation, MutationRegisterUserArgs>(
        REGISTER_USER_MUTATION
    );
    const [loginUser] = useMutation<Mutation, MutationLoginUserArgs>(LOGIN_USER_MUTATION);

    const handleRegisterUser = async (userData: RegisterUser) => {
        const { data } = await registerUser({ variables: { input: userData } });
        if (!data) return;

        setShowAlert(true);

        // Display success message
        if (data.registerUser.success) {
            setSeverity('success');
            setMutationError(null);
            setMutationSuccess('Account created successfully');
        }

        // Display error message
        if (!data.registerUser.success) {
            setSeverity('error');
            setMutationSuccess(null);
            setMutationError(data.registerUser.message);
        }
    };

    const handleLoginUser = async (userData: LoginUser) => {
        const { data } = await loginUser({ variables: userData });

        // Check the resolveType, in order to get the appropriate data
        const typename = data?.loginUser.__typename;

        if (typename === 'LoginSuccess') {
            const { accessToken } = data?.loginUser as LoginSuccess;
            localStorage.setItem('token', accessToken);
            setUserLoggedIn(true);
            if (userLoggedIn) navigate('/explore');
        }

        if (typename === 'ResolverError') {
            const { message } = data?.loginUser as ResolverError;
            setShowAlert(true);
            setMutationSuccess(null);
            setMutationError(message);
        }
    };

    const onSubmit = async (userData: RegisterUser) => {
        const { email, password } = userData;

        // If the registration was successful, just log in the user with the same credentials and
        // store the access token in local storage, so that they don't have to repeat this process.
        await handleRegisterUser(userData);
        await handleLoginUser({ email, password });
    };

    useEffect(() => {
        setFocus('name');
    }, [setFocus]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Heading textBelow>Create account</Heading>
            <HelperText>
                Already registered? <span>Login</span>
            </HelperText>
            <Input
                name="name"
                placeholder="Name"
                register={register}
                error={errors?.name?.message}
            />
            <Input
                name="email"
                placeholder="Email"
                type="email"
                register={register}
                error={errors?.email?.message}
            />
            <Input
                name="password"
                placeholder="Password"
                type="password"
                register={register}
                error={errors?.password?.message}
            />
            <Submit />

            {/* Snackbar Alert*/}
            <SnackbarAlert
                text={mutationError ?? mutationSuccess}
                severity={severity}
                open={showAlert}
                setOpen={setShowAlert}
            />
        </Form>
    );
};

export default Register;
