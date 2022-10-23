import styled from 'styled-components';

export const StyledInput = styled.input`
    border-radius: 10px;
    border: 1px solid var(--color-border);
    outline-color: var(--color-outline);
    background-color: rgba(220, 220, 220, 0.5);
    font-size: max(1.6rem, 1.2vw);
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
`;

export const ErrorLabel = styled.label`
    font-size: max(1.6rem, 1.2vw);
    line-height: 1.8;
    width: 80vw;
    margin-top: 1rem;
    color: red;

    @media (min-width: 820px) {
        width: 100vw;
    }
`;
