import styled from 'styled-components';

interface InputProps {
    error: string | undefined;
    explore?: boolean;
}

export const StyledInput = styled.input<InputProps>`
    border-radius: 10px;
    border: 1px solid var(--color-border);
    border-color: ${({ error }) => error && 'var(--color-error)'};
    outline-color: ${({ error }) =>
        error ? 'var(--color-error)' : 'var(--color-outline)'};
    background-color: ${({ explore }) =>
        explore ? 'transparent' : 'rgba(220, 220, 220, 0.5)'};
    font-size: max(1.6rem, 0.8vw);
    font-weight: 500;
    font-family: inherit;
    text-align: inherit;
    color: var(--color-text-dark);
    margin-top: ${({ explore }) => (explore ? '2rem' : '2.5rem')};
    padding: 1rem 2rem;
    width: min(75vw, 400px);
    height: 6rem;

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
