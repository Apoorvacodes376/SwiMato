import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #140000;
    color: white;
    font-family: system-ui, sans-serif;
    cursor: url("/src/assets/pizza-cursor.png") 16 16, auto;
  }

  button,
  a,
  [role="button"] {
    cursor: url("/src/assets/pizza-cursor.png") 16 16, pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
