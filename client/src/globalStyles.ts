import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --color-primary: #4397d6;
        --color-text-dark: #333;
        --color-text-light: #eee
    }

    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        text-align: center;
    }

    a,
    a:visited {
        text-decoration: none;
        color: var(--color-text-light);
    }
`;

export default GlobalStyle;
