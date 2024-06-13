import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* font */
  @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box !important;
  }

  body {
    font-family: var(--font-default);
    font-size: var(--font-text-size);
    color: var(--font-color);
    font-weight: 500;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: var(--font-color);
  }

  button {
    border: none;
    border-radius: var(--default-radius-2);
    font-weight: 600;
    cursor: pointer;
  }

  :root {
    --default-width: 920px;
    --grey-color: #f5f5f7;
    --main-color: #8ec8f3;
    --main-hover-color: #79b8e8; 
    --font-color: #222;
    --font-gray-color: #a2a2a2;
    --font-white-color: #fff;
    --font-footer-color: #eeeeee;
    --border-style: 1px solid #ccc;
    --font-default: 'SUIT-Regular';
    --font-text-size: 16px;
    --font-bold: 600;
    --layout-center: 0 auto;
    --default-radius: 16px;
    --default-radius-2: 6px;
  }

  section {
    width: 100%;
    border-radius: var(--default-radius);
  }

  @media only screen and (max-width: 1068px) {
    :root {
      --default-width: 720px;
    }
  }

  @media only screen and (max-width: 734px) {
    :root {
      --default-width: 420px;
      --font-text-size: 14px;
    }
  }

  @media only screen and (max-width: 420px) {
    :root {
      --default-width: 320px;
    }
  }
`;

export default GlobalStyle;
