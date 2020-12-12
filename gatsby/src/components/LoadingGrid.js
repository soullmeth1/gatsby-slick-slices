import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grid';
import skl from '../assets/images/skl.png';

function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }).map((_, i) => (
        <ItemStyles key={i}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src={skl}
            className="loading"
            alt="Loading"
            // style={{ width: 500, height: 400 }}
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}

export default LoadingGrid;
