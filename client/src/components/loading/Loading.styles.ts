import styled from 'styled-components';
import { flexCenter } from 'styles/mixins';

export const Container = styled.div`
    ${flexCenter({ flexDirection: 'row' })}
    height: 100vh;
`;
