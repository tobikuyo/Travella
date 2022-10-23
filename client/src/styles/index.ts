import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { button, flexCenter, heroBackground } from 'styles/mixins';

export const Hero = styled.div`
    ${flexCenter};
    ${heroBackground}
`;

export const Heading = styled.h1`
    font-size: clamp(2rem, 6vw, 4rem);
    text-transform: capitalize;
    color: var(--color-heading-dark);
    padding-block: 8rem 2rem;
    width: 90vw;
`;

export const Text = styled.p`
    font-size: max(1.6rem, 1.2vw);
    line-height: 1.8;
    width: 80vw;
    color: var(--color-text-dark);

    @media (min-width: 820px) {
        width: 100vw;
    }
`;

export const AppStyledLink = styled(Link)`
    ${button}
`;
