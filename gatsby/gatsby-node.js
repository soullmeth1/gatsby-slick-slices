const fetch = require(`node-fetch`);
const path = require('path');

function looping(data, actions, page) {
  const pageTemplate = path.resolve(
    `${
      page === 'Topping'
        ? './src/pages/pizzas.js'
        : `./src/templates/${page}.js`
    }`
  );

  data.nodes.forEach((val) => {
    // console.log('Creating a page for', pizza.name);
    actions.createPage({
      path: `${page === 'Slice' ? 'slicemaster' : 'pizzas'}/${
        page === 'Topping' ? val.name : val.slug.current
      }`,
      component: pageTemplate,
      context: {
        name: val.name,
        id: val.id,
      },
    });
  });
}

async function turnPagination({ graphql, actions }) {
  const pageTemplate = path.resolve('./src/pages/slicemaster.js');
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          slug {
            current
          }
          name
          id
        }
        totalCount
      }
      beers: allBeer {
        totalCount
      }
    }
  `);

  await looping(data.slicemasters, actions, 'Slice');

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `slicemaster${i ? `/page=${i + 1}` : '/'}`,
      component: pageTemplate,
      context: {
        limit: pageSize,
        skip: i * pageSize,
        currentPage: i + 1,
      },
    });
  });

  const pPage = 12;
  const pCount = Math.ceil(data.beers.totalCount / pPage);
  Array.from({ length: pCount }).forEach((_, i) => {
    actions.createPage({
      path: `beers${i ? `/page=${i + 1}` : ''}`,
      component: path.resolve('./src/pages/beers.js'),
      context: {
        limit: pPage,
        skip: i * pPage,
        currentPage: i + 1,
      },
    });
  });
}

async function turnPizzaIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  await Promise.all([
    looping(data.pizzas, actions, 'Pizza'),
    looping(data.toppings, actions, 'Topping'),
  ]);
}

exports.createPages = async (params) => {
  console.log('Create Pages');
  await turnPizzaIntoPages(params);
  //   await turnPizzaIntoPages(params, 'Topping');
  await turnPagination(params);
};

async function fetchData({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;

  // Data can come from anywhere, but for now create it manually
  const baseURL = 'https://sampleapis.com/beers/api/ale';

  const res = await fetch(baseURL);
  const myData = await res.json();
  // .then((data) => console.log(data));

  for (const beer of myData) {
    const nodeContent = JSON.stringify(beer);
    const nodeMeta = {
      id: createNodeId(`my-data-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: `Beer`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(beer),
      },
    };

    createNode({ ...beer, ...nodeMeta });
  }
}

exports.sourceNodes = async (params) => {
  await fetchData(params);
};
