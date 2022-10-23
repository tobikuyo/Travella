import styled from 'styled-components';
import { flexCenter } from 'styles/mixins';

export const Container = styled.div`
    ${flexCenter({ justifyContent: 'center' })}
    height: 100vh;
`;
