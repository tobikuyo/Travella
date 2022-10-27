import { useAppDispatch } from 'hooks/useAppDispatch';
import { DestinationDetails } from 'interfaces/trip';
import { updateDestinationDetails } from 'store/reducers/trip.reducer';
import { Location } from './Destination.styles';

interface DestinationProps {
    details: DestinationDetails;
}

const Destination = ({ details }: DestinationProps) => {
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(updateDestinationDetails({ ...details }));
    };

    return (
        <Location onClick={onClick}>
            <span>{details.destination}</span>
        </Location>
    );
};

export default Destination;
