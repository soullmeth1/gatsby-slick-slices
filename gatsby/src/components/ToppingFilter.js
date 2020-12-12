import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--grey);
    padding: 5px;
    border-radius: 2px;
    .count {
      background-color: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzaInToppings(pizzas) {
  return Object.values(
    pizzas
      .map((pizza) => pizza.toppings.map((val) => val))
      .flat()
      .reduce((acc, { id, name, vegetarian }) => {
        if (acc[id]) {
          acc[id].count += 1;
        } else {
          acc[id] = {
            id,
            name,
            vegetarian,
            count: 1,
          };
        }
        return acc;
      }, {})
  ).sort((a, b) => b.count - a.count);
}

export default function ToppingsFilter() {
  const { pizzas } = useStaticQuery(graphql`
    query MyQuery {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
            vegetarian
          }
        }
      }
    }
  `);
  //   console.clear();
  //   console.log(props);
  //   console.log(toppings);

  const pizzaToppings = countPizzaInToppings(pizzas.nodes);

  //   console.log(pizzaToppings);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {pizzaToppings.map((data) => (
        <Link to={`/pizzas/${data.name}`} key={data.id}>
          <span className="name">{data.name}</span>
          <span className="count">{data.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
