import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ErrorLabel, StyledInput } from './Input.styles';

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    error: string | undefined;
} & Omit<React.ComponentProps<'input'>, 'name'>;

const Input = <T extends FieldValues>({
    type = 'text',
    name,
    register,
    error,
    ...rest
}: InputProps<T>) => {
    return (
        <>
            <StyledInput
                type={type}
                id={name}
                error={error}
                {...rest}
                {...register(name)}
            />
            {/* Displays an error label, if there is an error for the input */}
            {error && <ErrorLabel htmlFor={name}>{error}</ErrorLabel>}
        </>
    );
};

export default Input;
