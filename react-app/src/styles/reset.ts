import { css } from '@emotion/react';
import { lightBlue, blueGrey } from '@mui/material/colors';

const reset = css`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-jp.css);
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  ul {
    padding: 0;
  }
  li {
    list-style: none;
  }
  colgroup {
    display: table-column-group;
  }

  select {
    width: 200px;
    height: 32px;
    padding-left: 7px;
    -webkit-appearance: menulist;
    -moz-appearance: menulist;
    appearance: menu;
    border: 1px solid #eee;
    border-radius: 0px;
    background-color: #fff;
  }
  select::-ms-expand {
    display: none;
  }
  input#password {
    padding: 0;
    border: 0;
    border-bottom: 2px #e1e1e1 solid;
  }
  input[type='button'] {
    border-radius: 0;
  }
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background-color: rgba(254, 78, 108, 0.2);
    background-image: none;
    color: #000;
  }
  html,
  body,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  textarea,
  p,
  blockquote,
  th,
  td,
  img {
    margin: 0;
    padding: 0;
  }
  div {
    cursor: default;
  }
  li {
    list-style: none;
  }
  img,
  fieldset {
    border: none;
    vertical-align: middle;
  }
  input {
    font-size: 17px;
    color: #000;
    vertical-align: middle;
    opacity: 1;
  }
  select,
  option,
  textarea {
    font-size: 17px;
    color: #000;
    vertical-align: middle;
  }
  a,
  a:link,
  a:visited {
    text-decoration: none;
    color: #000;
  }
  a:active {
    text-decoration: none;
  }
  table {
    border-spacing: 0;
    border: 0;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  }
  button {
    padding: 0;
    margin: 0;
    border: 0;
    overflow: visible;
    cursor: pointer;
    background-color: transparent;
  }
  [role='button'] {
    cursor: pointer;
  }
  button:focus {
    outline: 0;
  }
  strong {
    font-weight: bold;
  }
  html {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    text-size-adjust: 100%;
  }
  body {
    font-size: 17px;
    line-height: 1.5;
    scroll-behavior: smooth;
    letter-spacing: -0.4px !important;
  }
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(18, 18, 18, 0) !important;
    font-family: 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important;
    font-display: block;
    letter-spacing: -0.4px !important;
  }
  body {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    text-size-adjust: 100%;
  }
  /* 사파리 누를때 줌 안되게 */
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  ::-moz-scrollbar {
    display: none !important;
  }
  ::-webkit-scrollbar {
    display: none !important;
  }
  img {
    border: none;
    vertical-align: middle;
    max-width: 100%;
  }
  select {
    padding-left: 7px;
    padding-right: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #d8d8d8;
    border-radius: 0px;
    /* background: url(https://danoshop.net/mall/upload/resource/common/selection-arrow.svg)
    no-repeat right 5px center #fff; */
  }
  input {
    line-height: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    padding: 0px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    touch-action: pan-y;
  }
  input,
  textarea {
    caret-color: #ff5722 !important;
  }
  input::placeholder {
    color: #ced4da;
  }
  input[type='checkbox'] {
    padding: 0;
  }
  input[type='text'],
  input[type='password'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  input:focus,
  input:active,
  input:hover {
    outline: none;
    background-color: transparent;
  }
  caption {
    visibility: visible;
    position: absolute;
    left: -1000px;
    top: -1000px;
    height: 0;
    width: 0;
    display: none;
  }
  #__next {
    width: 100%;
    height: 100vh;
    --sat: var(--sait);
    --sar: var(--sair);
    --sab: var(--saib);
    --sal: var(--sail);
  }
  .circle-countdown {
    width: 441px;
    height: 441px;
    position: relative;
    top: 0;
    left: 0;
    padding: 2.5rem;
    border: 1px solid ${lightBlue[700]};
    border-radius: 50%;
    overflow: hidden;
  }
  .wave-animation {
    overflow: hidden;
  }
  .wave-animation__percent {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 64px;
  }
  .wave-animation__water {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    /*Adjust 60% here to change the progress, wave height*/
    transform: translate(0, calc(100% - 60%));
    background: ${lightBlue[700]};
    transition: all 2s;
  }
  .wave-animation__water-wave {
    width: 200%;
    position: absolute;
    bottom: 100%;
  }
  .wave-animation__water-wave--back {
    right: 0;
    fill: ${blueGrey[900]};
    animation: wave-back 1.4s infinite linear;
  }
  .wave-animation__water-wave--front {
    left: 0;
    fill: ${lightBlue[700]};
    margin-bottom: -1px;
    animation: wave-front 0.7s infinite linear;
  }
  @keyframes wave-front {
    100% {
      transform: translate(-50%, 0);
    }
  }
  @keyframes wave-back {
    100% {
      transform: translate(50%, 0);
    }
  }
`;

export default reset;
