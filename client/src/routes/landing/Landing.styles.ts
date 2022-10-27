import styled from 'styled-components';
import { AppStyledLink, Hero, Text } from 'styles';

export const HeroContainer = styled(Hero)`
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

export const About = styled(Text)`
    width: 80vw;

    @media (min-width: 700px) {
        width: 70vw;
    }

    @media (min-width: 820px) {
        width: 100vw;
    }
`;

export const StyledLink = styled(AppStyledLink)`
    margin-top: 3rem;
    width: max-content;
`;
