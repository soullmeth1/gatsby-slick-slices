import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PageGrid = styled.div`
  display: flex;
  margin-top: 2rem;
  a {
    flex: 1;
    max-width: 20px;
    padding: 1rem;
    border: 1px solid var(--grey);
    text-align: center;
    text-decoration: none;
    &[aria-current='page'] {
      background-color: var(--yellow);
      pointer-events: none;
    }
  }
`;

const Pagination = ({ base, perPage, totalCount }) => {
  const length = Math.ceil(totalCount / perPage);
  return (
    <PageGrid>
      {Array.from({ length }).map((_, i) => (
        <Link key={i} to={`/${base}${i ? `/page=${i + 1}` : ''}`}>
          {i + 1}
        </Link>
      ))}
    </PageGrid>
  );
};

export default Pagination;
