import React from 'react';
import Layout from './src/components/Layout';
import OrderContext from './src/components/OrderContext';

const wrapPageElement = ({ element, props }) => (
  <Layout props={props}>{element}</Layout>
);

const wrapRootElement = ({ element }) => <OrderContext>{element}</OrderContext>;

export { wrapPageElement, wrapRootElement };
