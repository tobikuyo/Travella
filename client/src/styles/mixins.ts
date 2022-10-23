import { css } from 'styled-components';

interface FlexCenterProps {
    flexDirection?: 'column' | 'row';
}

export const flexCenter = ({ flexDirection = 'column' }: FlexCenterProps) => css`
    display: flex;
    flex-direction: ${flexDirection};
    align-items: center;
    justify-content: ${flexDirection === 'row' ? 'center' : 'start'};
`;
