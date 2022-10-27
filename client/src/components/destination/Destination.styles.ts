import styled from 'styled-components';

export const Location = styled.div`
    border: 1px solid var(--color-border);
    border-radius: 100vmax;
    width: 16rem;
    padding-block: 1rem;
    transition: all 0.2s ease-in-out;

    & > span {
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--color-text-dark);
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #eee;
            border-color: #eee;
            cursor: pointer;
        }
    }
`;
