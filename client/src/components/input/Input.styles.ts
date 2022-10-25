import styled from 'styled-components';

interface InputProps {
    error: string | undefined;
}

export const StyledInput = styled.input<InputProps>`
    border-radius: 10px;
    border: 1px solid var(--color-border);
    border-color: ${({ error }) => error && 'var(--color-error)'};
    outline-color: ${({ error }) =>
        error ? 'var(--color-error)' : 'var(--color-outline)'};
    background-color: rgba(220, 220, 220, 0.5);
    font-size: max(1.6rem, 1.2vw);
    font-weight: 500;
    font-family: inherit;
    text-align: inherit;
    color: var(--color-text-dark);
    margin-top: 3rem;
    padding: 1rem 2rem;
    width: min(65vw, 400px);
    height: 6rem;

    &:first-of-type {
        margin-top: 2rem;
    }

    &::placeholder {
        font-weight: 400;
    }
`;

export const ErrorLabel = styled.label`
    font-size: max(1.6rem, 1.2vw);
    line-height: 1.8;
    width: 80vw;
    margin-top: 1rem;
    color: var(--color-error);

    @media (min-width: 820px) {
        width: 100vw;
    }
`;
