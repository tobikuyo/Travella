import styled from 'styled-components';
import { Text } from 'styles';
import { button, flexCenter, heroBackground } from 'styles/mixins';

export const Form = styled.form`
    ${flexCenter};
    ${heroBackground};
    background-image: linear-gradient(
            rgba(238, 238, 238, 1) 40%,
            rgba(238, 238, 238, 0.6) 70%,
            rgba(238, 238, 238, 0) 80%
        ),
        url('https://bit.ly/3gq0Oit');

    @media (max-height: 800px) {
        background-image: linear-gradient(
                rgba(238, 238, 238, 1) 40%,
                rgba(238, 238, 238, 0.6) 70%,
                rgba(238, 238, 238, 0.4) 80%
            ),
            url('https://bit.ly/3gq0Oit');
    }
`;

export const SubText = styled(Text)`
    color: #222;

    span {
        font-weight: 600;
    }
`;

export const Submit = styled.input.attrs({ type: 'submit', value: 'Register' })`
    ${button}
    width: min(65vw, 400px);
    margin-block: 3rem 2rem;

    &:disabled {
        background-color: #a9a9a9;
    }
`;
