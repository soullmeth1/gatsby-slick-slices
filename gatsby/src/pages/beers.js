import { graphql } from 'gatsby';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  > div {
    display: grid;
    /* grid-template-rows: 2fr 1fr 1fr; */
    text-align: center;
    border: 1px solid var(--grey);
    padding: 2rem;
    img {
      /* background-color: red; */
      width: 100%;
      height: 200px;
      object-fit: contain;
      display: block;
      display: grid;
      align-items: center;
      background-color: var(--grey);
      /* color: red; */
    }
    h3 {
    }
  }
`;

const BeersPage = (props) => {
  const { data, pageContext } = props;
  console.log(props);
  return (
    <>
      <SEO title={`Beers Order - Page ${pageContext.currentPage || 1}`} />
      <h2 className="center" style={{ marginBottom: '2rem' }}>
        We have {data.beers.totalCount} Beers Available. Dine in Only!{' '}
      </h2>
      <BeerGridStyles>
        {data.beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <div key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              <p title={`${rating} out of 5 stars`}>
                {[...Array(rating)].map((val, i) => (
                  <AiFillStar key={i} />
                ))}
                {[...Array(5 - rating)].map((val, i) => (
                  <AiOutlineStar key={i} />
                ))}
                <span>({beer.rating.reviews})</span>
              </p>
            </div>
          );
        })}
      </BeerGridStyles>
      <Pagination
        base="beers"
        perPage={pageContext.limit || 12}
        totalCount={data.beers.totalCount}
      />
    </>
  );
};
export default BeersPage;

export const query = graphql`
  query($limit: Int = 12, $skip: Int = 0) {
    beers: allBeer(limit: $limit, skip: $skip) {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
      totalCount
    }
  }
`;
