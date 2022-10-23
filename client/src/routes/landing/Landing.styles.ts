import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixins';

export const HeroContainer = styled.div`
    ${flexCenter};
    height: 100vh;
    color: var(--color-text-dark);
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(
            rgba(238, 238, 238, 1) 20%,
            rgba(238, 238, 238, 0.4) 40%,
            rgba(238, 238, 238, 0) 60%
        ),
        url('https://bit.ly/3gq0Oit');

    @media (max-height: 800px) {
        background-image: linear-gradient(
                rgba(238, 238, 238, 0.6) 50%,
                rgba(238, 238, 238, 0.4) 60%,
                rgba(238, 238, 238, 0.2) 70%,
                rgba(238, 238, 238, 0) 80%
            ),
            url('https://bit.ly/3gq0Oit');
    }
`;

export const Heading = styled.h1`
    font-size: clamp(2rem, 6vw, 4rem);
    padding-block: 8rem 2rem;
    width: 90vw;
`;

export const Text = styled.p`
    font-size: max(1.6rem, 1.2vw);
    line-height: 1.8;
    width: 80vw;

    @media (min-width: 820px) {
        width: 100vw;
    }
`;

export const StyledLink = styled(Link)`
    font-size: max(1.6rem, 1.2vw);
    background-color: var(--color-primary);
    margin-top: 3rem;
    padding: 1.5rem 2rem;
    border-radius: 100vmax;
    transition: all 0.2s ease-in-out;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
        }

        &:active {
            transform: translateY(-1px);
            box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
        }
    }
`;
