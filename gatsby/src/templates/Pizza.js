import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const Pizza = (props) => {
  console.log(props);
  const {
    data: { pizza },
  } = props;

  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
          <h3>Price : ${pizza.price / 100}</h3>
        </div>
      </PizzaGrid>
    </>
  );
};
export default Pizza;

export const query = graphql`
  query($id: String!) {
    pizza: sanityPizza(id: { eq: $id }) {
      id
      name
      price
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        vegetarian
        id
      }
    }
  }
`;
