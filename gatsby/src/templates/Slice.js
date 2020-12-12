import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const Slice = ({ data: { person } }) => {
  console.log(person);
  return (
    <>
      <SEO
        title={`${person.name}'s Profile`}
        image={person.image.asset.fluid.src}
      />
      <div className="center">
        <Img fluid={person.image.asset.fluid} alt={person.name} />
        <h2>
          <span className="mark">{person.name} </span>
        </h2>
        <p>{person.description}</p>
      </div>
    </>
  );
};

export default Slice;

export const query = graphql`
  query($id: String) {
    person: sanityPerson(id: { eq: $id }) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 1000) {
            ...GatsbySanityImageFluid
          }
        }
      }
      description
    }
  }
`;
