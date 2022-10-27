import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { button, flexCenter, heroBackground } from 'styles/mixins';

interface HeadingProps {
    textBelow?: boolean;
}

export const Hero = styled.div`
    ${flexCenter};
    ${heroBackground}
`;

export const Heading = styled.h1<HeadingProps>`
    font-size: clamp(2rem, 6vw, 4rem);
    text-transform: capitalize;
    color: var(--color-heading-dark);
    padding-block: 8rem ${({ textBelow }) => (textBelow ? '1rem' : '2rem')};
    width: 90vw;
`;

export const Text = styled.p`
    font-size: max(1.6rem, 0.8vw);
    line-height: 1.8;
    color: var(--color-text-dark);
`;

export const AppStyledLink = styled(Link)`
    ${button}
`;
