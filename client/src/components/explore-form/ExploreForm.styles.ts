import styled from 'styled-components';
import { button } from 'styles/mixins';

export const Form = styled.form`
    width: min(75vw, 400px);
`;

export const SearchButton = styled.input.attrs({
    type: 'submit',
    value: 'Search'
})`
    ${button}
`;
