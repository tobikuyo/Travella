import { ExploreForm } from 'components';
import { Container, HeadingText, MainHeading, SubHeading } from './Explore.styles';

const Explore = () => {
    return (
        <Container>
            <MainHeading textBelow>Explore the world</MainHeading>
            <HeadingText>Browse numerous destinations</HeadingText>
            <ExploreForm />
            <SubHeading>Explore top destinations</SubHeading>
        </Container>
    );
};

export default Explore;
