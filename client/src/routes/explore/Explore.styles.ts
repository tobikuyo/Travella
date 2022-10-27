import styled from 'styled-components';
import { Heading, Text } from 'styles';
import { flexCenter, heroBackground } from 'styles/mixins';

export const Container = styled.div`
    ${flexCenter}
    ${heroBackground} 
    background-image: linear-gradient(
             rgba(238, 238, 238, 1) 20%,
            rgba(238, 238, 238, 0.4) 40%,
            rgba(238, 238, 238, 0) 60%
        );
`;

export const MainHeading = styled(Heading)`
    font-size: clamp(2.3rem, 6vw, 3.5rem);
`;

export const SubHeading = styled.h2`
    font-size: clamp(1.8rem, 5.2vw, 2.5rem);
    text-transform: capitalize;
    color: var(--color-heading-dark);
    padding-block: 3rem 4rem;
`;

export const HeadingText = styled(Text)`
    margin-bottom: 2rem;
`;
