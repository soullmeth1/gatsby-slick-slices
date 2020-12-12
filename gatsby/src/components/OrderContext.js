import React, { createContext, useContext, useState } from 'react';
// import usePizza from '../utils/usePizza';

export const orderContext = createContext();

const OrderContext = ({ children }) => {
  const [order, setOrder] = useState([]);
  // const { order, addOrder, removeOrder } = usePizza();
  return (
    <orderContext.Provider value={[order, setOrder]}>
      {children}
    </orderContext.Provider>
  );
};

export default OrderContext;

export const useContextOrder = () => useContext(orderContext);
