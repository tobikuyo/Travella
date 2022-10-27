import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 2rem 1rem;
    justify-items: center;
    width: min(85vw, 550px);
`;
