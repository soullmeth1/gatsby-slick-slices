import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grid';
import useFetchUpdate from '../utils/useFetchUpdate';

const SliceMaster = ({ slicemasters }) => (
  <div>
    <h2>
      <span className="mark tilt">Hot Slices</span>
    </h2>
    <p>Standing by, Ready to slice you up!</p>
    {!slicemasters?.length && <LoadingGrid count={4} />}
    {slicemasters && !slicemasters?.length && (
      <p>No one is working right now!</p>
    )}
    {slicemasters?.length ? <ItemGrid items={slicemasters} /> : ''}
  </div>
);

const PizzaCurrent = ({ pizzacurrent }) => (
  <div>
    <h2>
      <span className="mark tilt">Hot Slices</span>
    </h2>
    <p>Come on by, Buy the slice!</p>
    {!pizzacurrent?.length && <LoadingGrid count={4} />}
    {pizzacurrent && !pizzacurrent?.length && <p>Nothin' in the case!</p>}
    {pizzacurrent?.length ? <ItemGrid items={pizzacurrent} /> : ''}
  </div>
);

export default function HomePage() {
  const { slice, pizza } = useFetchUpdate();
  console.log(slice, pizza);
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <SliceMaster slicemasters={slice} />
        <PizzaCurrent pizzacurrent={pizza} />
      </HomePageGrid>
    </div>
  );
}
