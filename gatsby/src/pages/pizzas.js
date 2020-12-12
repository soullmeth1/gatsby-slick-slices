import React from 'react';
import { graphql } from 'gatsby';
import Pizzalist from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingFilter';
import SEO from '../components/SEO';

const PizzasPage = (props) => {
  const { location, data, pageContext } = props;
  const pizzas = data.pizzas.nodes;
  console.log(props);
  console.log(location);
  // const tes = context();
  // console.log(tes);
  return (
    <>
      <SEO
        title={
          pageContext.name ? `Pizzas with ${pageContext.name}` : `All Pizzas`
        }
      />
      <ToppingsFilter />
      <Pizzalist data={pizzas} />
    </>
  );
};

export default PizzasPage;

export const query = graphql`
  query PizzaQuery($id: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
