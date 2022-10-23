import { Heading, HeroContainer, StyledLink, Text } from './Landing.styles';

const Landing = () => {
    return (
        <HeroContainer>
            <Heading>Plan your trip with travella</Heading>
            <Text>
                No matter where you want to travel to with your loved ones, we can help
                you find things to do.
            </Text>
            <StyledLink to="/register">Start your search</StyledLink>
        </HeroContainer>
    );
};

export default Landing;
