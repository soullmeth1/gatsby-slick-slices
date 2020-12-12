import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    /* border: 1px solid red; */
    height: auto;
    font-size: 0;
  }
  p {
    position: absolute;
    transform: rotate(-2deg) translateY(-50%);
    width: 100%;
    left: 0;
    margin: 0;
    /* background-color: red; */
  }
  .mark {
    display: inline;
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    /* background-position: 0px; */
    animation: shine 1s infinite linear;
  }
  @keyframes shine {
    from {
      background-position: 0px;
    }
    to {
      background-position: 160px;
    }
  }
`;
