import { Destination } from 'components';
import { DestinationDetails } from 'interfaces/trip';
import { Container } from './PopularDestinations.styles';

interface PopularDestinationProps {
    destinations: DestinationDetails[];
}

const PopularDestinations = ({ destinations }: PopularDestinationProps) => {
    return (
        <Container>
            {destinations.map(details => (
                <Destination key={details.destination} details={details} />
            ))}
        </Container>
    );
};

export default PopularDestinations;
