/* eslint-disable jsx-a11y/label-has-associated-control */
import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import caclPrice from '../utils/caclPrice';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyle from '../styles/MenuItemStyle';
import formatCurrency from '../utils/formatCurrency';
import usePizza from '../utils/usePizza';

const OrderPage = (props) => {
  const { values, updateValue, resetForm } = useForm({
    name: '',
    email: '',
    myClass: '',
  });
  const {
    data: { pizzas },
  } = props;
  const {
    order,
    addOrder,
    removeOrder,
    handleSubmit,
    loading,
    error,
    message,
  } = usePizza(pizzas, values);
  console.log(pizzas);
  return (
    <div>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            type="text"
            name="myClass"
            value={values.myClass}
            onChange={updateValue}
            className="myClass"
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.nodes.map((pizza) => (
            <MenuItemStyle key={pizza.id}>
              <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
                {/* <p>{`$${pizza.price / 100}`}</p> */}
              </div>
              <div>
                {['S', 'M', 'L'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() =>
                      addOrder({
                        id: pizza.id,
                        size: val,
                        resPrice: caclPrice(pizza.price, val),
                      })
                    }
                  >
                    {val} {`${formatCurrency(caclPrice(pizza.price, val))}`}
                  </button>
                ))}
              </div>
            </MenuItemStyle>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          {order.map((val, i) => (
            <MenuItemStyle key={val.id + i}>
              <Img fluid={val.image.asset.fluid} />
              <h2>{val.name}</h2>
              <p>{`${formatCurrency(val.resPrice)}`}</p>
              <button
                type="button"
                className="remove"
                onClick={() => removeOrder(i)}
                title={`Remove ${val.name} from Order`}
              >
                &times;
              </button>
            </MenuItemStyle>
          ))}
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your total is{' '}
            {formatCurrency(
              order.reduce((acc, curr) => acc + curr.resPrice, 0)
            )}
          </h3>
          <div>
            <p>
              {error || ''}
              {message || ''}
            </p>
          </div>
          <button type="submit" onClick={(e) => handleSubmit(e, resetForm)}>
            {loading ? 'Processing Order..' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </div>
  );
};

export default OrderPage;

export const query = graphql`
  query {
    pizzas: allSanityPizza {
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
      }
    }
  }
`;
