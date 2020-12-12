import { useEffect, useState } from 'react';

const gql = String.raw;

const fragments = gql`
name
_id
image {
  asset {
    url
    metadata {
      lqip
    }
  }
}
`;

const useFetchUpdate = () => {
  const [slice, setSlice] = useState([]);
  const [pizza, setPizza] = useState([]);
  useEffect(() => {
    fetch(process.env.GATSBY_SANITY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${fragments}
              }
              pizzascurrent {
                ${fragments}
                toppings {
                  name
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(({ data: { StoreSettings } }) => {
        console.log(StoreSettings);
        setPizza(StoreSettings.pizzascurrent);
        setSlice(StoreSettings.slicemasters);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    slice,
    pizza,
  };
};

export default useFetchUpdate;
