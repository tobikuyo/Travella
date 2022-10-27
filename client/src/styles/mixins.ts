import { css } from 'styled-components';

interface FlexCenterProps {
    flexDirection?: 'column' | 'row';
    justifyContent?: 'start' | 'center';
}

export const flexCenter = ({
    flexDirection = 'column',
    justifyContent = 'start'
}: FlexCenterProps) => css`
    display: flex;
    flex-direction: ${flexDirection};
    align-items: center;
    justify-content: ${justifyContent};
`;

export const heroBackground = () => css`
    background-position: center;
    background-size: cover;
    height: 100vh;
`;

export const button = () => css`
    font-size: max(1.7rem, 0.8vw);
    font-family: inherit;
    background-color: var(--color-primary);
    padding: 2rem;
    margin-block: 2.5rem;
    width: min(75vw, 400px);
    border: none;
    border-radius: 100vmax;
    transition: all 0.2s ease-in-out;

    &:disabled {
        background-color: #a9a9a9;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
        }
    }
`;
