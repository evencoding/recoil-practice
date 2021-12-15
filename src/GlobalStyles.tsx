import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing:border-box;
    }
    body{
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
        font-family: 'Source Sans Pro', sans-serif;
    }
    a{
        text-decoration:none;
        color:inherit;
    }
`;

export default GlobalStyles;
