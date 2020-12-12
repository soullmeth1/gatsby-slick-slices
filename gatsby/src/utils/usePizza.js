import { useState } from 'react';
import { useContextOrder } from '../components/OrderContext';
import formatCurrency from './formatCurrency';

export default function usePizza({ nodes: pizzas }, values) {
  const [order, setOrder] = useContextOrder();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  //   console.log(
  //     pizzas.find((val) => val.id === '-0c86f18e-7e0c-5842-9f54-89e0424ab188')
  //   );

  function addOrder(newOrder) {
    const pizza = pizzas.find((val) => val.id === newOrder.id);
    setOrder([...order, { ...newOrder, ...pizza }]);
  }

  function removeOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function handleSubmit(e, resetForm) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const parseOrder = order.map((val) => ({
      id: val.id,
      name: val.name,
      price: formatCurrency(val.resPrice),
      size: val.size,
      thumbnail: val.image.asset.fluid.src,
    }));
    // console.log(parseOrder);

    const body = {
      order: parseOrder,
      total: formatCurrency(
        order.reduce((acc, curr) => acc + curr.resPrice, 0)
      ),
      name: values.name,
      email: values.email,
      myClass: values.myClass,
    };

    const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/orderPage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(res);
    const text = JSON.parse(await res?.text());
    console.log(text);

    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage(text.message);
      resetForm({ name: '', email: '', myClass: '' });
      setOrder([]);
    }
  }

  return {
    order,
    addOrder,
    removeOrder,
    handleSubmit,
    loading,
    error,
    message,
  };
}
