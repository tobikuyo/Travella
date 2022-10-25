import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthForm, Input, SnackbarAlert } from 'components';
import { registerSchema } from 'validations';
import { useAuth } from 'hooks/useAuth';
import { RegisterUser } from 'interfaces/User';

const Register = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm<RegisterUser>({
        resolver: yupResolver(registerSchema)
    });

    const {
        showAlert,
        severity,
        mutationSuccess,
        mutationError,
        userLoggedIn,
        setShowAlert,
        handleRegisterUser
    } = useAuth();

    const navigate = useNavigate();

    const onSubmit = (userData: RegisterUser) => {
        handleRegisterUser(userData);
    };

    useEffect(() => {
        setFocus('name');
    }, [setFocus]);

    useEffect(() => {
        if (userLoggedIn) navigate('/explore');
    }, [userLoggedIn, navigate]);

    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
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
            <SnackbarAlert
                text={mutationError ?? mutationSuccess}
                severity={severity}
                open={showAlert}
                setOpen={setShowAlert}
            />
        </AuthForm>
    );
};

export default Register;
