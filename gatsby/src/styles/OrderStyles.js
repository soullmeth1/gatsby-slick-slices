const { default: styled } = require('styled-components');

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    display: grid;
    gap: 1rem;
    overflow: auto;
    max-height: 600px;
    align-content: start;
    legend {
      display: inline-block;
      padding: 5px;
    }
    &.order,
    &.menu {
      grid-column: span 1;
      /* contain: paint; */
    }
    .myClass {
      position: absolute;
      z-index: -1;
      display: none;
    }
  }
  /* @media screen and (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
`;

export default OrderStyles;
