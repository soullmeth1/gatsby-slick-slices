import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grid';

function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map((val) => (
        <ItemStyles key={val.image.asset.url}>
          <p>
            <span className="mark">{val.name}</span>
          </p>
          <img
            width="500"
            height="400"
            src={`${val.image.asset.url}?w=500&h=400&fit=crop`}
            alt={val.name}
            style={{
              background: `url(${val.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}

export default ItemGrid;
