import { useNavigate } from 'react-router-dom';
import { Heading } from 'styles';
import { Form, HelperText, LoginSubmit, RegisterSubmit } from './AuthForm.styles';

interface AuthFormProps {
    type?: 'register' | 'login';
    onSubmit: (
        e?: React.BaseSyntheticEvent<object, any, any> | undefined
    ) => Promise<void>;
    children: React.ReactNode;
}

const AuthForm = ({ type = 'register', onSubmit, children }: AuthFormProps) => {
    const isRegister = type === 'register';
    const heading = isRegister ? 'Create Account' : 'Log In';
    const helperText = isRegister ? 'Already registered?' : "Don't have an account?";
    const callToAction = isRegister ? 'Login' : 'Register';
    const navigate = useNavigate();

    const onClick = () => {
        if (type === 'register') navigate('/login');
        if (type === 'login') navigate('/register');
    };

    return (
        <Form onSubmit={onSubmit}>
            <Heading textBelow>{heading}</Heading>
            <HelperText>
                {helperText} <span onClick={onClick}>{callToAction}</span>
            </HelperText>
            {children}
            {isRegister ? <RegisterSubmit /> : <LoginSubmit />}
        </Form>
    );
};

export default AuthForm;
