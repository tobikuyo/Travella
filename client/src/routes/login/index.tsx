import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthForm, Input, SnackbarAlert } from 'components';
import { useAuth } from 'hooks/useAuth';
import { LoginUser } from 'interfaces/User';
import { registerSchema } from 'validations';

const Login = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm<LoginUser>({
        resolver: yupResolver(registerSchema)
    });

    const {
        showAlert,
        severity,
        mutationSuccess,
        mutationError,
        userLoggedIn,
        setShowAlert,
        handleLoginUser
    } = useAuth();

    const navigate = useNavigate();

    const onSubmit = (userData: LoginUser) => {
        handleLoginUser(userData);
    };

    useEffect(() => {
        setFocus('email');
    }, [setFocus]);

    useEffect(() => {
        if (userLoggedIn) navigate('/explore');
    }, [userLoggedIn, navigate]);

    return (
        <>
            <AuthForm type="login" onSubmit={handleSubmit(onSubmit)}>
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
        </>
    );
};

export default Login;
