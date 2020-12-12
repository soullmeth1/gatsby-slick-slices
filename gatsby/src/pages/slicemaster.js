import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SliceMasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  > div {
    display: grid;
    /* grid-auto-rows: auto 3fr auto; */
    .gatsby-image-wrapper {
      height: 400px;
    }
    a {
      text-decoration: none;
    }
    h2 {
      transform: rotate(-2deg);
      text-align: center;
      position: relative;
      z-index: 2;
      margin-bottom: -2rem;
      font-size: 4rem;
    }
    .description {
      background-color: var(--yellow);
      padding: 1rem;
      margin: 2rem;
      margin-top: -6rem;
      z-index: 2;
      transform: rotate(1deg);
    }
  }
`;

const SlicemastersPage = (props) => {
  const { data, pageContext } = props;
  console.log(data);
  console.log(props);
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <SliceMasterGrid>
        {data.slicemasters.nodes.map((person) => (
          <div key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </div>
        ))}
      </SliceMasterGrid>
      <Pagination
        perPage={pageContext.limit || 4}
        totalCount={data.slicemasters.totalCount}
        base="slicemaster"
      />
    </>
  );
};

export default SlicemastersPage;

export const query = graphql`
  query($limit: Int = 4, $skip: Int = 0) {
    slicemasters: allSanityPerson(limit: $limit, skip: $skip) {
      totalCount
      nodes {
        name
        description
        id
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
      }
    }
  }
`;
