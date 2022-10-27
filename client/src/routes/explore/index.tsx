import { ExploreForm, PopularDestinations } from 'components';
import { DestinationDetails } from 'interfaces/trip';
import destinationsJSON from './destinations.json';
import { Container, HeadingText, MainHeading, SubHeading } from './Explore.styles';

const Explore = () => {
    const parsedDestinations = JSON.parse(JSON.stringify(destinationsJSON));
    const destinations = parsedDestinations['destinations'] as DestinationDetails[];

    return (
        <Container>
            <MainHeading textBelow>Explore the world</MainHeading>
            <HeadingText>Browse numerous destinations</HeadingText>
            <ExploreForm />
            <SubHeading>Popular destinations</SubHeading>
            <PopularDestinations destinations={destinations} />
        </Container>
    );
};

export default Explore;
