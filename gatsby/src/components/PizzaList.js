import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 4rem;
`;

const PizzaStyles = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 500px;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  // console.log(pizza);
  return (
    <PizzaStyles>
      <Link to={`/pizzas/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((val) => val.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

export default function Pizzalist({ data }) {
  console.log(data);
  return (
    <PizzaGridStyles>
      {data.map((val) => (
        <SinglePizza pizza={val} key={val.id} />
      ))}
    </PizzaGridStyles>
  );
}
