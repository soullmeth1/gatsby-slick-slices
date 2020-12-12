import { graphql } from 'gatsby';
import React from 'react';
import Pizzalist from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingFilter';

const Topping = (props) => {
  console.log(props);
  const {
    data: { pizzas },
  } = props;
  return (
    <div>
      <ToppingsFilter />

      <Pizzalist data={pizzas.nodes} />
    </div>
  );
};

export default Topping;

export const query = graphql`
  query($id: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        id
        name
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
        toppings {
          id
          name
          vegetarian
        }
      }
    }
  }
`;
