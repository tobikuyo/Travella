import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'components';
import { RegisterUser } from 'interfaces/User';
import { Heading } from 'styles';
import { registerSchema } from 'validations';
import { Form, Submit, SubText } from './Register.styles';

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
            <Heading>Create account</Heading>
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
            <SubText>
                Already registered? <span>Login</span>
            </SubText>
        </Form>
    );
};

export default Register;
