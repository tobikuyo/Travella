import { Heading } from 'styles';
import { About, HeroContainer, StyledLink } from './Landing.styles';

const Landing = () => {
    return (
        <HeroContainer>
            <Heading>Plan your trip with travella</Heading>
            <About>
                No matter where you want to travel to with your loved ones, we can help
                you find things to do.
            </About>
            <StyledLink to="/register">Start your search</StyledLink>
        </HeroContainer>
    );
};

export default Landing;
