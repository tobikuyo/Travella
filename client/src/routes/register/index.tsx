import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'components';
import { RegisterUser } from 'interfaces/User';
import { Heading } from 'styles';
import { registerSchema } from 'validations';
import { Form, Submit, HelperText } from './Register.styles';

const Register = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm<RegisterUser>({
        resolver: yupResolver(registerSchema)
    });

    useEffect(() => {
        setFocus('name');
    }, [setFocus]);

    return (
        <Form>
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
        </Form>
    );
};

export default Register;
